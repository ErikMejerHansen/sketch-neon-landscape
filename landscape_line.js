class LandscapeLine {
  /**
   *
   * @param {number} segments - the number of segments this line should have
   * @param {*} z - the z (distance from viewer) of the line
   */
  constructor(segments, z, d) {
    this.d = d;
    this.z = z;
    this.points = [];

    // Choose a random color for the line. Using HSB values is nice because it allows us to easily
    // change the brightness and saturation values independently of the hue.
    this.h = round(random(255));

    // We add a bit of extra lengths to both ends of the line
    // This prevents the lines from becoming to narrow at high z values
    let padding = 2000;
    let segmentLength = (width + padding * 2) / segments;
    this.points.push(createVector(-padding, 1000));

    let previousX = -padding;
    for (let i = 0; i < segments; i++) {
      previousX += segmentLength;
      this.points.push(
        createVector(previousX, map(noise(z + i * 0.5), 0, 1, 200, 400))
      );
    }
    this.points.push(createVector(previousX, 1000));
  }

  /**
   * Private
   * Generate the 2D projection for this line give d
   * @param {number} d - distance from viewer to projection
   */
  project() {
    return this.points.map((point) =>
      createVector(point.x * (d / this.z), point.y * (d / this.z))
    );
  }

  /**
   * Draws the LandscapeLine to the canvas
   */
  draw() {
    fill(0);
    let projected = this.project();

    let strokePath = (path, weight, alpha) => {
      beginShape();
      for (let i = 0; i < path.length; i++) {
        let v = projected[i];
        vertex(v.x, v.y);
      }
      endShape();

      let strokeColor = `hsba(${this.h}, ${round(
        100 - this.z
      )}%, ${100}%, ${alpha})`;
      strokeWeight(weight);
      stroke(strokeColor);
    };

    // strokePath(projected, 15, 0.01);
    strokePath(projected, 15, 0.1);
    strokePath(projected, 2, 1);
  }

  /**
   * Adjust the z coordinate of the LandscapeLine by the amount given
   * @param {number} amount - the amount to change z coordinate of each point by
   */
  moveZ(amount) {
    if (this.z + amount < this.d) {
      print(this.d);
      this.z = 70;
    } else {
      this.z -= amount;
    }
  }
}
