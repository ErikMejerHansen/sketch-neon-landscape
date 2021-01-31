const d = 5;
let lines = [];
function setup() {
  createCanvas(800, 300);

  for (let i = 0; i < 20; i++) {
    lines.push(new LandscapeLine(100, d + i * 5, d));
  }
}

function draw() {
  translate(width / 2, height / 2);
  background(0);

  // We want to draw the line closest to the viewer last.
  let sorted = lines.sort((a, b) => b.z - a.z);
  for (let line of sorted) {
    line.draw();
    line.moveZ(0.08);
  }
}
