const models = require("../../db/models");
const TASK_CODE = require('../../enums/TASK_CODE');
const RESPONSE_CODE = require('../../enums/RESPONSE_CODE');
const utils = require('../../utils/utils');

class SectionServices {
  constructor(wellSection) {
    this._wellSection = wellSection;
    this._section_max_length = wellSection.section_max_length;
    this._section_min_length = wellSection.section_min_length;
    this._cluster_max_length = wellSection.cluster_max_length;
    this._cluster_min_length = wellSection.cluster_min_length;
    this._cluster_num = wellSection.cluster_num;
    this._start = wellSection.start;
    this._end = wellSection.end;
    this._perforation_length = wellSection.perforation_length;
    this._perforation_count_per_meter = wellSection.perforation_count_per_meter;
  }

  async init() {
    let wellQuatity = await models.proc_well_quatity.findOne({
      where:{
        well_plan: this._wellSection.wellplan
      }
    })
    this._quatityDetails = await models.proc_well_quatity_detail.findAll({
      where: {
        well_quatity: wellQuatity.id
      },
      order: [['id', 'DESC']]
    });
    if(this._quatityDetails.length === 0) {
      for(let index = this._end; index > this._start; index--) {
        this._quatityDetails.push({
          md: index,
          value: 0
        })
      }
    }
  }

  async exec() {
    await this.init();
    await this.caling();
    let sections = this.autoSection();
    await this.saveSections(sections);
    await this.finished();
    return utils.responseString(RESPONSE_CODE.SUCCESS, "成功！");
  }

  async saveSections(sections) {
    await models.sequelize.transaction(async (t) => {
      await models.proc_well_section_detail.destroy({
        where: {
          wellsection: this._wellSection.id
        },
        transaction : t
      });

      for (let index = 0; index < sections.length; index++) {
        const section = sections[index];
        let savedSection = await models.proc_well_section_detail.create(section, {
          transaction: t
        });
        section.clusters.forEach(cluster=>{
          cluster.wellsectiondetail = savedSection.id;
        });
        await models.proc_well_section_cluster.bulkCreate(section.clusters,{
          transaction: t
        });
      }
    });
  }

  autoSection() {
    this._avgValue = this.avgValue();
    let totalLength = this._end - this._start;
    this._sectionNum = Math.ceil(totalLength / (this._section_min_length + this._section_max_length) * 2);
    if(this._sectionNum <= 0) {
      throw '参数有误！';
    }
    this.calUpper(this._avgValue);
    let sections = this.createSections();
    return sections;
  }

  calUpper(avgValue) {
    let totalUpper = 0
    this._quatityDetails.forEach(quatity => {
      if(quatity.value > avgValue) {
        quatity.isUpper = 1;
        totalUpper++;
      }
      else {
        quatity.isUpper = 0;
      }
    });
    this._totalUpper = totalUpper;
    this._sectionUpperNum = Math.ceil(totalUpper / this._sectionNum);
  }

  avgValue() {
    if(this._quatityDetails.length === 0) {
      return 0;
    }
    let sum = 0;
    this._quatityDetails.forEach(quatity => {
      sum += quatity.value;
    });
    return sum / this._quatityDetails.length;
  }

  createSections() {
    let sections = [];
    let sectionUpperNum = 0;
    let currentSection = {};
    let createNew = true;
    this._quatityDetails.forEach(quatity => {
      let md = quatity.md;
      let isUpper = quatity.isUpper;
      if(createNew) {
        createNew = false;
        currentSection = {};
        currentSection.end = md;
        currentSection.start = md - this._perforation_length;
        sectionUpperNum = 0;
      }
      sectionUpperNum += isUpper;
      currentSection.wellsection = this._wellSection.id;
      let currentLength = currentSection.end - md;
      if((sectionUpperNum >= this._sectionUpperNum && currentLength > this._section_min_length)
        || (currentLength > this._section_max_length)) {
          currentSection.start = md;
          createNew = true;
          sections.push(currentSection);
      }
      for(let index = 0;index < sections.length; index++) {
        sections[index].index = index + 1;
        if(index + 1 < sections.length) {
          sections[index + 1].end = sections[index].start;
        }
      }
    })
    sections.forEach(section => {
      this.createClusters(section);
    });
    return sections;
  }

  createClusters(section) {
    let start = section.start;
    let end = section.end;
    let clusters = [];
    this.createCluster(start, end, start, end, clusters);
    clusters.forEach(cluster => {
      cluster.perforation_length = this._perforation_length;
    })
    section.clusters = clusters;
  }

  createCluster(start, end, min, max, clusters) {
    let clusterMd = this.getMaxValueMd(start, end);
    let cluster = {};
    cluster.position = clusterMd;
    clusters.push(cluster);
    let leftLower = clusterMd - this._cluster_max_length;
    let leftHigher = clusterMd - this._cluster_min_length;
    let rightLower = clusterMd + this._cluster_min_length;
    let rightHigher = clusterMd + this._cluster_max_length;
    if (leftLower > min && leftHigher > min) {
      this.createCluster(leftLower, leftHigher, min, leftHigher, clusters);
    }

    if (leftHigher > min && leftLower < min) {
      this.createCluster(min, leftHigher, min, leftHigher, clusters);
    }

    if (rightLower < max && rightHigher < max) {
      this.createCluster(rightLower, rightHigher, rightLower, max, clusters);
    }

    if (rightLower < max && rightHigher > max) {
      this.createCluster(rightLower, max, rightLower, max, clusters);
    }
  }

  getMaxValueMd(start, end) {
    let length = this._quatityDetails.length;
    let max = -11111111111;
    let maxIndex = -1;
    for(let index = 0; index < length; index++) {
      let quatity = this._quatityDetails[index];
      let md = quatity.md;
      let value = quatity.value;
      if(md >= start && md <= end && max < value) {
        max = value;
        maxIndex = index;
      }
    }
    if(maxIndex < 0) {
      return (start + end) / 2
    }
    return this._quatityDetails[maxIndex].md;
  }
  
  async caling() {
    await this.changeTaskStats(TASK_CODE.CALING);
  }

  async finished() {
    await this.changeTaskStats(TASK_CODE.FINISHED);
  }

  async error() {
    await this.changeTaskStats(TASK_CODE.ERROR);
  }

  async changeTaskStats (code) {
    this._wellSection.stats = code;
    await this._wellSection.save();
  }
}

module.exports = SectionServices;
