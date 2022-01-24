import Game from "./modules/game.js"

function main() {
  const game = new Game();
  alert(`Bienvenue dans Coworking Simulator ${Game.appVersion}`);
}

window.addEventListener('load', main)
