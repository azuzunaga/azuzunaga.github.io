const COLORS  = [
  "#60D394",
  "#847996",
  "#F18805",
  "#EE6055"
];

class Token {
  constructor(options = {}) {
    this.canvasWidth = 620;
    this.canvasHeight = 600;
    this.radius = 20;
    this.pos = options.pos ||
      [this.canvasWidth / 2, this.canvasHeight];
    this.vel = options.vel || [0, 0];
    this.color = COLORS[this.getRandomInt(4)];
    this.impacted = options.impacted || false;
  }

  getRandomInt(n) {
    return Math.floor(Math.random() * Math.floor(n));
  }

  move() {
    const leftEdge = this.canvasWidth - this.radius;

    if (this.pos[1] < this.radius + 1) {
      this.pos = [this.pos[0], this.radius];
    } else if (this.pos[0] < this.radius || this.pos[0] > leftEdge) {
      this.vel[0] = -1 * this.vel[0];
      this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    } else {
      this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  collideWith(token) {
    let xDist = token.pos[0] - this.pos[0];
    let yDist = token.pos[1] - this.pos[1];
    let originDist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    return originDist < 35;
  }
}

export default Token;
