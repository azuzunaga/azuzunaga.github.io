import Game from './game';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  const ctx = canvas.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, canvas, ctx);
  gameView.start();

  document.addEventListener("click", () => {
    gameView.shootToken();
  });

  document.addEventListener("mousemove",
    gameView.mouseMoveHandler.bind(gameView)
  );

});
