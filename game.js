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

class Place {
  constructor(place_name, cosy_rate, equipement_rate) {
    this.name = place_name;
    this.cosyRate = cosy_rate;
    this.equipementRate = equipement_rate;
  }
}

const kPlaces = [
  new Place("Dans un bar", 2, 1),
  new Place("Dans un local prêté par un ami", 1, 2),
  new Place("À la CCI", 2, 2),
];

function randomElementIn(collection) {
  const index = Math.floor(Math.random() * collection.length);
  return collection[index];
}

const kCoworkerNameFirstLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
class Coworker {
  constructor() {
    this.name = `${randomElementIn(kCoworkerFirstNames)} ${randomElementIn(kCoworkerNameFirstLetters)}.`;
  }
}

class Dom {
  constructor() {
    this.place = document.getElementById('place');
    this.coworkers = document.getElementById('coworkers');
    this.money = document.getElementById('money');
  }
}

class Game {
  constructor() {
    this.coworkers = [new Coworker()];
    this.money = 0;
    this.level = 0;
    this.dom = new Dom();
    this.dom.place.innerText = `Nom: ${kPlaces[this.level].name}`;
    this.dom.coworkers.innerText = `Nom: ${this.coworkers[0].name}`;
  }

  update() {
    this.money += this.coworkers.length
  }

  render() {
    this.dom.money.innerText = this.money + "€";
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
