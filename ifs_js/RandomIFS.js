class RandomIFS {
  constructor(parameters) {
    // public
    this.affine_functions = parameters.affine_functions;
    this.points = [];
    this.starting_point = parameters.starting_point || [0, 0];
    this.map_bounds = {
      xmin: Number.MAX_VALUE,
      xmax: -1,
      ymin: Number.MAX_VALUE,
      ymax: -1,
    };

    // private
    this.transformations = this.affine_functions.length;
  }

  setTransformation(new_transformation, transformation_no) {
    this.affine_functions[transformation_no - 1] = new_transformation;
  }

  getTransformations() {
    return this.affine_functions;
  }

  // get a random transformation from this.affine_functions
  #getRandomTransformation() {
    let chosen = false;
    let to_sel = 0;

    while (!chosen) {
      if (to_sel == this.transformations) {
        to_sel = -1;
      } else if (Math.random() < this.affine_functions[to_sel][6]) {
        chosen = true;
        break;
      }

      to_sel++;
    }

    return this.affine_functions[to_sel];
  }

  // apply the tranformation formula to a point
  #transformPoint(transformation, point) {
    let [a, b, c, d, e, f] = transformation;
    let [x, y] = point;

    return [a * x + b * y + e, c * x + d * y + f];
  }

  // generate a set of points based on the system
  generate(n, offset = 0) {
    // reset the points calculated
    this.points = [];

    // set the current point to the starting point
    let current_point = this.starting_point;
    let offset_met = false;
    let transformation = this.affine_functions[0];

    for (let i = 0; i < n + offset; i++) {
      offset_met = i >= offset;

      // choose a random transformation
      transformation = this.#getRandomTransformation();

      // generate the next point by transforming the current one
      current_point = this.#transformPoint(transformation, current_point);

      // add the point to the array, if past the offset
      if (offset_met) {
        this.map_bounds.xmax =
          current_point[0] > this.map_bounds.xmax
            ? current_point[0]
            : this.map_bounds.xmax;
        this.map_bounds.xmin =
          current_point[0] < this.map_bounds.xmin
            ? current_point[0]
            : this.map_bounds.xmin;
        this.map_bounds.ymax =
          current_point[1] > this.map_bounds.ymax
            ? current_point[1]
            : this.map_bounds.ymax;
        this.map_bounds.ymin =
          current_point[1] < this.map_bounds.ymin
            ? current_point[1]
            : this.map_bounds.ymin;

        this.points.push(current_point);
      }
    }

    return [this.points, this.map_bounds];
  }
}
