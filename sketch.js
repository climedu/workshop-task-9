let webcam;
let scale = 18; // Size of each pixel block

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  webcam = createCapture(VIDEO);
  webcam.size(width / scale, height / scale);
  webcam.hide(); // Hide the default HTML webcam element
}

function draw() {
  background(0);
  webcam.loadPixels(); // Load webcam pixels

  for (let y = 0; y < height; y += scale) {
    for (let x = 0; x < width; x += scale) {
      // Map (x, y) to webcam pixel coordinates
      let px = int(x / scale);
      let py = int(y / scale);
      let index = (py * webcam.width + px) * 4;

      // Get pixel color
      let r = webcam.pixels[index];
      let g = webcam.pixels[index + 1];
      let b = webcam.pixels[index + 2];

      fill(r, g, b);
      noStroke();
      rect(x, y, scale, scale); // Draw pixel block
      filter(POSTERIZE,3);
    }
  }
}
