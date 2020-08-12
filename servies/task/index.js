const TASK_CODE = require('../../enums/TASK_CODE')

class taskServies  {
  constructor(task){
    this._task = task;
  }

  async caling() {
    this._task.start_at = Date.now();
    await this.changeTaskStats(TASK_CODE.CALING);
  }

  async finished(successMsg) {
    this._task.response_args = JSON.stringify(successMsg);
    this._task.finish_at = Date.now();
    await this.changeTaskStats(TASK_CODE.FINISHED);
  }

  async error(errorMsg) {
    this._task.response_args = JSON.stringify(errorMsg);
    await this.changeTaskStats(TASK_CODE.ERROR);
  }

  async changeTaskStats (code) {
    this._task.stats = code;
    await this._task.save();
  }
}

module.exports = taskServies;