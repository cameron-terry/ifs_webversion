let MAX_PARAM_SIZE = 1;
let MIN_PARAM_SIZE = -1;

let CANVAS_WIDTH = 299;
let CANVAS_HEIGHT = 149;

function translateCoords(bounds, coords) {
  const { xmin, xmax, ymin, ymax } = bounds;
  const [x, y] = coords;
  const containerX = (CANVAS_WIDTH / (xmax - xmin)) * (x - xmin);
  const containerY = (-CANVAS_HEIGHT / (ymax - ymin)) * (y - ymax);

  return [containerX, containerY];
}

function fillCanvas(points, bounds = null, random = false) {
  let x,
    y = null;
  for (let i = 0; i < points; i++) {
    if (random) {
      x = Math.floor(Math.random() * CANVAS_WIDTH);
      y = Math.floor(Math.random() * CANVAS_HEIGHT);
    } else {
      if (bounds != null) {
        [x, y] = translateCoords(bounds, g.points[i]);
      } else {
        alert("Check that bounds are specified");
      }
    }

    // ctx.fillRect(x, y, 1, 1);
    drawPixel(x, y);
  }
}

function drawPixel(x, y) {
  data[0] = 0;
  data[1] = 0;
  data[2] = 0;
  data[3] = 255;

  ctx.putImageData(image, x, y);
}

const bloom = [
  [-0.47, 0.4, -0.25, -0.51, -0.79, 0.82, 0.31],
  [0.5, -0.59, 0.5, 0.5, 0.44, -0.2, 0.69],
];

const bonzai = [
  [-0.68, -0.79, -0.35, 0.35, 0.09, -0.34, 0.33],
  [-0.42, -0.38, 0.28, -0.74, 0.19, 0.5, 0.67],
];

const forest = [
  [-0.16, 0.06, -0.68, 0.38, 0.94, -0.06, 0.19],
  [-0.69, 0.12, -0.44, 0.56, 0.53, -0.01, 0.16],
  [-0.51, -0.45, -0.65, 0.58, -0.63, -0.18, 0.65],
];

const cycles = [
  [-0.55, 0.06, 0.53, -0.32, -0.28, 0.32, 0.48],
  [0.77, -0.36, 0.77, 0.37, -0.41, -0.48, 0.52],
];

const universe = [
  [0.35, 0.52, 0.88, 0.0, 0.38, 0.87, 0.12],
  [0.62, 0.46, -0.69, 0.48, -0.95, -0.87, 0.88],
];

const donut = [
  [-0.04, 0.43, -0.39, -0.28, 0.65, -0.77, 0.32],
  [0.51, -0.86, 0.69, 0.78, -0.51, 0.1, 0.68],
];

// generated from universe
const new_fractal = [
  [0.45, 0.1, 0.9, -0.35, 1.1, 0.65, 0.1],
  [0.62, 0.46, -0.69, 0.48, -0.95, -0.87, 0.88],
];

const new_fractal_2 = [
  [0.45, 0.1, 0.9, -0.35, 1.1, 0.65, 0.1],
  [0.6, 0.55, -0.75, 0.5, -1.3, -0.85, 0.9],
];

const new_fractal_3 = [
  [-0.25, 0.1, 0.9, -0.35, 1.1, 0.65, 0.1],
  [0.6, 0.55, -0.75, 0.5, -1.3, -0.85, 0.9],
];

// i see a creature either holding a tree by a river
// or a creature holding a tornado
const rorshach = [
  [0.05, 0.15, 0.8, -0.35, 1.75, -1.55, 0.1],
  [0.6, 0.55, -0.75, 0.5, -1.3, -0.85, 0.9],
];

const g = new RandomIFS({
  affine_functions: forest,
});

const p = 20000;
let [res, bounds] = g.generate(p);
console.log(g);

const canvas = document.getElementById("canvas");
const demo_div = document.querySelector(".demo");
const ctx = canvas.getContext("2d");

var image = ctx.createImageData(1, 1); // pixel image
var data = image.data;

ctx.fillStyle = "black";
fillCanvas(p, bounds);
