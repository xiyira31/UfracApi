class DfnServices {
  constructor(request) {
    this._start = request.start;
    this._end = request.end;
    this._avg_length = request.avg_length;
    this._angle = request.angle;
    this._density = request.density;
    this._y_offset = request.y_offset;
    this._angle_offset = request.angle_offset;
    this._min_length = request.min_length;
  }

  async exec() {}

  async createDnfs() {
    let sectionLength = this._end - this._start;
    let area = sectionLength * dfnScope;
    let dfns = [];
    let totalLength = 0;
    while (true) {
      let dfn = createDfnDetail();
      totalLength
    }
  }

  async createDfnDetail() {
    let sectionLength = this._end - this._start;
    let dfn = {};
    dfn.X = Math.random() * sectionLength + this._start;
    dfn.Y = Math.random() * _y_offset - this._y_offset / 2;
    dfn.Theta = angle + Math.random() * this._angle_offset;
    dfn.Length = Math.random() * this._avg_length;
    return dfn;
  }
}
