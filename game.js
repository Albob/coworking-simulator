const kAppVersion = "0.0.1";

function randomElementIn(collection) {
  const index = Math.floor(Math.random() * collection.length);
  return collection[index];
}

class Place {
  constructor(place_name, cosy_rate, equipement_rate, place_description) {
    this.name = place_name;
    this.cosyRate = cosy_rate;
    this.equipementRate = equipement_rate;
    this.description = place_description;
  }
}

const kPlaces = [
  new Place("Dans un bar", 2, 1, 'Un endroit convivial mais bruyant'),
  new Place("Dans un local prêté par un ami", 1, 2, 'Un endroit pratique mais un peu austère'),
  new Place("À la CCI", 2, 3, 'Un endroit qui permet de se concentrer et aussi de se détendre'),
  new Place("La Capsule II", 3, 4, 'Les meilleures conditions, à la fois pour travailler et pour'),
];

const kCoworkerFirstNames = [
  ['Pierre', 'M'],
  ['Pierre-Louis', 'M'],
  ['Pierre-Francois', 'M'],
  ['Sophie', 'F'],
  ['Chloe', 'F'],
  ['Nico', 'M'],
  ['Gael', 'M'],
  ['Sandra', 'F'],
  ['Paul', 'M'],
  ['David', 'M'],
  ['Elise', 'F'],
  ['Guillaume', 'M'],
  ['Benjamin', 'M'],
  ['Christine', 'F'],
  ['Alexis', 'M'],
  ['Alexandra', 'F'],
  ['Emilie', 'F'],
  ['Philippe', 'M'],
  ['Anthony', 'M'],
];

const kJobs = [
  ['Influenceur', 'Influenceuse'],
  ['Developpeur', 'Developpeuse'],
  ['Web designer', 'Web designer'],
  ['Architecte', 'Architecte'],
  ['Graphiste', 'Graphiste'],
  ['Illustrateur', 'Illustratrice'],
  ['Dessinateur', 'Dessinatrice'],
  ['Animateur', 'Animatrice'],
  ['Facilitateur', 'Facilitatrice'],
  ['Congierge', 'Congierge'],
  ['Commercial', 'Commerciale'],
  ['Vidéaste', 'Vidéaste'],
  ['Agent immobilier', 'Agent immobilier'],
  ['Formateur', 'Formatrice'],
  ['Journaliste', 'Journaliste'],
  ['Écrivain', 'Écrivain'],
  ['Négociateur', 'Négociatrice'],
  ['Agriculteur', 'Agricultrice'],
  ['Conseiller', 'Conseillère'],
  ['Éleveur', 'Éleveuse'],
];

const kJobAdjectives = [
  ['', ''],
  ["mais n'assume pas", "mais n'assume pas"],
  ['en developpement durable', 'en developpement durable'],
  ['pour mal entendants', 'pour mal entendants'],
  ['pour personnes âgées', 'pour personnes âgées'],
  ['pour animaux', 'pour animaux'],
  ['paysagiste', 'paysagiste'],
  ['des stars', 'des stars'],
  ['en reconversion', 'en reconversion'],
  ['en agencement', 'en agencement'],
  ['sur internet', 'sur internet'],
  ['en éducation', 'en éducation'],
  ['autodidacte', 'autodidacte'],
  ['debutant', 'debutante'],
  ['confirmé', 'confirmée'],
  ['retraité', 'retraitée'],
  ['excentrique', 'excentrique'],
  ['farfelu', 'farfelue'],
  ['consultant', 'consultante'],
  ['à mi-temps', 'à mi-temps'],
  ['des temps modernes', 'des temps modernes'],
  ["mais rêve secrètement d'être aventurier", "mais rêve secrètement d'être aventurière"],
];

const kCoworkerNameFirstLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

class Coworker {
  constructor() {
    const firstNameAndSex = randomElementIn(kCoworkerFirstNames);
    const firstName = firstNameAndSex[0];
    const sex = firstNameAndSex[1];

    this.name = `${firstName} ${randomElementIn(kCoworkerNameFirstLetters)}.`;

    const jobTitle = randomElementIn(kJobs)[sex == 'M' ? 0 : 1];
    const jobAdjective = randomElementIn(kJobAdjectives)[sex == 'M' ? 0 : 1];
    this.job = `${jobTitle} ${jobAdjective}`;
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

    const place = kPlaces[this.level];
    this.dom.place.innerHTML = `Nom: ${place.name}<br/>Description: ${place.description}`;

    this.dom.coworkers.innerHTML = '';
    this.coworkers.forEach(coworker => {
      this.dom.coworkers.innerHTML = `Nom: ${coworker.name}<br/>Métier: ${coworker.job}`;
    });
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
