import Token from './token';
import Gun from './gun';

class Game {
  constructor() {
    this.loadedToken = {};
    this.token = {};
    this.gun = [];
    this.stoppedTokens = [];
    this.nonImpactedTokens = [];
    this.loadToken();
    this.loadRows();
  }

  loadRows() {
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 15; c++) {
        let posX = c * 40 + 20 * (r % 2) + 20;
        let posY = 40 * r + 20;

        let token = new Token({
          pos: [posX, posY],
        });
        this.stoppedTokens.push(token);
      }
    }
  }

  loadToken() {
    this.loadedToken = new Token ({
      pos: [Game.DIM_X / 2, Game.DIM_Y - 20],
      impacted: false,
    });
  }

  addGun() {
    const gun = new Gun({
      game: this,
      width: Game.DIM_X,
      height: Game.DIM_Y,
    });

    this.gun = gun;

    return gun;
  }

  draw(ctx) {

    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    if (this.token instanceof Token) {
      for (let i = 0; i < this.stoppedTokens.length; i++) {
        let stopToken = this.stoppedTokens[i];

        if (this.token.collideWith(stopToken)) {
          // check if tokens are the same color, remove if yes
          if (this.token.color === stopToken.color) {
            this.token.impacted = true;
            stopToken.impacted = true;
            break;
          } else {
            // add token to stoppedTokens array and stack in grid
            this.token.pos[1] = stopToken.pos[1] + 40;
            this.token.pos[0] = Math.ceil(this.token.pos[0] / 40) * 40 - 20;
            this.token.vel = [0, 0];

            // hexagonal stacking
            if ((this.token.pos[1] / 20) % 4 === 3) {
              this.token.pos[0] = this.token.pos[0] + 20;
            }
            this.stoppedTokens.push(this.token);
            break;
          }
        }
      }

      this.stoppedTokens.forEach(stopToken =>{
        if (!stopToken.impacted) {
          this.nonImpactedTokens.push(stopToken);
        }
      });

      if (this.token.pos[1] === this.token.radius) {
        this.token.pos[0] = Math.ceil(this.token.pos[0] / 40) * 40 - 20;
      }

      this.token.draw(ctx);
      window.token = this.token;
      window.loadedToken = this.loadedToken;

      this.stoppedTokens = this.nonImpactedTokens;
      this.nonImpactedTokens = [];
    }

    window.stoppedTokens = this.stoppedTokens;
    window.nonImpactedTokens = this.nonImpactedTokens;


    this.stoppedTokens.forEach(stopToken => {
      stopToken.draw(ctx);
    });
    this.loadedToken.draw(ctx);
    this.gun.draw(ctx);
  }

  moveToken() {
    if (this.token instanceof Token){
      this.token.move();
    }
  }
}

Game.BG_COLOR = "lightgray";
Game.DIM_X = 620;
Game.DIM_Y = 600;
Game.ROW_SIZE = 15;

export default Game;
