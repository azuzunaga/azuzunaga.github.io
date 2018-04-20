import Token from './token';

class Gun {
  constructor(options = {}) {
    this.game = options.game;

    this.canvas = document.getElementById("canvas");
    this.canvasWidth = options.width;
    this.canvasHeight = options.height;

    this.gunLength = 50;
    this.gunX = options.gunX || 0;
    this.gunY = options.gunY || this.gunLength;

    this.relativeX = 0;
    this.relativeY = 20;
  }

  shootToken() {
    const tokenX = this.gunX / (this.gunLength / 10);
    const tokenY = -this.gunY / (this.gunLength / 10);

    let token = this.game.loadedToken;
    token.vel = [tokenX, tokenY];

    this.game.token = token;

    this.game.loadToken();
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.canvasWidth / 2, this.canvasHeight - this.relativeY);
    ctx.lineTo(this.canvasWidth / 2 + this.gunX, this.canvasHeight - this.gunY);
    ctx.stroke();
  }

  calculateCoords(relativeX, relativeY) {
    // Get x and y distances based on mouse coordinates and gun length
    let k = Math.pow(
      Math.pow(
        this.gunLength, 2
      ) / (Math.pow(
        relativeX, 2
      ) + Math.pow(
        relativeY, 2
      )), 0.5
    );

    this.gunX = relativeX * k;
    this.gunY = relativeY * k;
  }
}

export default Gun;
