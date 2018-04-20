class GameView {
  constructor(game, canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.game = game;
    this.gun = this.game.addGun({});
  }

  start() {
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.game.draw(this.ctx);
    this.game.moveToken();
    requestAnimationFrame(this.animate.bind(this));
  }

  shootToken() {
    this.gun.shootToken();
  }

  mouseMoveHandler(e) {
    let leftOffset = this.offset(this.canvas).left;
    let topOffset = this.offset(this.canvas).top;

    let canWidth = this.canvas.width;
    let canHeight = this.canvas.height;

    let relativeX = e.clientX - canWidth / 2 - leftOffset;
    let relativeY = canHeight + 20 - (e.clientY - topOffset);

    this.gun.calculateCoords(relativeX, relativeY);
  }

  offset(el) {
    let rect = el.getBoundingClientRect();
    return { top: rect.top, left: rect.left };
  }
}

export default GameView;
