/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(5);



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_X;
  canvas.height = __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */].DIM_Y;

  const ctx = canvas.getContext("2d");
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  const gameView = new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](game, canvas, ctx);
  gameView.start();

  document.addEventListener("click", () => {
    gameView.shootToken();
  });

  document.addEventListener("mousemove",
    gameView.mouseMoveHandler.bind(gameView)
  );

});


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__token__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gun__ = __webpack_require__(6);



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

        let token = new __WEBPACK_IMPORTED_MODULE_0__token__["a" /* default */]({
          pos: [posX, posY],
        });
        this.stoppedTokens.push(token);
      }
    }
  }

  loadToken() {
    this.loadedToken = new __WEBPACK_IMPORTED_MODULE_0__token__["a" /* default */] ({
      pos: [Game.DIM_X / 2, Game.DIM_Y - 20],
      impacted: false,
    });
  }

  addGun() {
    const gun = new __WEBPACK_IMPORTED_MODULE_1__gun__["a" /* default */]({
      game: this,
      width: Game.DIM_X,
      height: Game.DIM_Y,
    });

    this.gun = gun;

    return gun;
  }

  draw(ctx) {

    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    if (this.token instanceof __WEBPACK_IMPORTED_MODULE_0__token__["a" /* default */]) {
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
    if (this.token instanceof __WEBPACK_IMPORTED_MODULE_0__token__["a" /* default */]){
      this.token.move();
    }
  }
}

Game.BG_COLOR = "lightgray";
Game.DIM_X = 620;
Game.DIM_Y = 600;
Game.ROW_SIZE = 15;

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Token);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__token__ = __webpack_require__(4);


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

/* harmony default export */ __webpack_exports__["a"] = (Gun);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map