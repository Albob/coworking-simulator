const kAppVersion = "0.0.1";

const kCoworkerFirstNames = [
  'Pierre',
  'Pierre-Louis',
  'Pierre-Francois',
  'Sophie',
  'Chloe',
  'Nico',
  'Gael',
  'Sandra',
  'Paul',
  'David',
  'Elise',
  'Guillaume',
  'Benjamin',
  'Christine',
  'Alexis',
  'Alexandra',
  'Emilie',
  'Philippe',
  'Anthony',
];

function randomElement(collection) {
  const index = Math.floor(Math.random() * collection.length);
  return collection[index];
}

const kCoworkerNameFirstLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
class Coworker {
  constructor() {
    this.name = `${randomElement(kCoworkerFirstNames)} ${randomElement(kCoworkerNameFirstLetters)}.`;
  }
}

class Game {
  constructor() {
    this.coworkers = [new Coworker()];
    this.money = 0;
  }

  update() {
    this.money += this.coworkers.length
  }

  render() {
    document.getElementById('coworkers').innerText = `Nom: ${this.coworkers[0].name}`;
    document.getElementById('money').innerText = this.money + "€";
  }
}

function main() {
  const game = new Game();
  window.setInterval(() => {
    game.update();
    game.render();
  }, 1000);
}

window.addEventListener('load', main)
