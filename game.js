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
  ['Alexandra', 'F'],
  ['Alexis', 'M'],
  ['Anthony', 'M'],
  ['Benjamin', 'M'],
  ['Chloé', 'F'],
  ['Christine', 'F'],
  ['David', 'M'],
  ['Elise', 'F'],
  ['Emilie', 'F'],
  ['Gael', 'M'],
  ['Guillaume', 'M'],
  ['Julien', 'F'],
  ['Manon', 'F'],
  ['Margaux', 'F'],
  ['Nicolas', 'M'],
  ['Nolwenn', 'F'],
  ['Paul', 'M'],
  ['Philippe', 'M'],
  ['Pierre-Arnaud', 'M'],
  ['Pierre-Francois', 'M'],
  ['Pierre-Louis', 'M'],
  ['Pierre', 'M'],
  ['Sandra', 'F'],
  ['Sophie', 'F'],
  ['Yannick', 'F'],
];

const kCoworkerLastNames = [
  'Basque',
  'Bouchouille',
  'Clouzot',
  'Gilette',
  'Labenne',
  'Liroy',
  'Séjoune',
  'Tchengue-a',
  'Valpouche',
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
  ['Éducateur', 'Éducatrice'],
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
  ['en conseil', 'en conseil'],
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

class Coworker {
  constructor() {
    const firstNameAndSex = randomElementIn(kCoworkerFirstNames);
    const firstName = firstNameAndSex[0];
    const sex = firstNameAndSex[1];

    this.name = `${firstName} ${randomElementIn(kCoworkerLastNames)}.`;

    const jobTitle = randomElementIn(kJobs)[sex == 'M' ? 0 : 1];
    const jobAdjective = randomElementIn(kJobAdjectives)[sex == 'M' ? 0 : 1];
    this.job = `${jobTitle} ${jobAdjective}`;

    this.balance = 0;
    this.isWorking = true;
  }

  update(place) {
    const factor = this.isWorking ? 1 : -1;
    const effect = this.isWorking ? place.equipementRate : place.cosyRate;
    this.balance += factor * 5 / effect;
  }
}

class Dom {
  constructor() {
    this.place = document.getElementById('place');
    this.clock = document.getElementById('clock');
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
    this.clock = 7 * 60; // 8:00 am

    // Place
    const place = kPlaces[this.level];
    this.dom.place.innerHTML = `Nom: ${place.name}<br/>Description: ${place.description}`;

    // Coworkers
    const getButtonClosure = (index) => {
      return () => {
        const coworker = this.coworkers[index];
        coworker.isWorking = !coworker.isWorking;

        const buttonId = `toggleCoworker${index}`;
        const button = document.getElementById(buttonId);
        button.setAttribute('value', coworker.isWorking ? 'Faire une pause' : 'Reprendre le travail');
      };
    };

    let i = 0;
    this.dom.coworkers.innerHTML = '';
    this.coworkers.forEach(coworker => {
      const buttonId = `toggleCoworker${i}`;
      let html = `Nom: ${coworker.name}
        <br/>Métier: ${coworker.job}
        <br/>Equilibre: <span id="coworkerBalance${i}">${coworker.balance}</span>
        <br/><input type="button" id="${buttonId}" value="Faire une pause" />`;
      this.dom.coworkers.innerHTML += html;
      document.getElementById(buttonId).addEventListener('click', getButtonClosure(i));
      i++;
    });
  }

  update() {
    this.clock += 1;
    this.money += this.coworkers.length;

    const place = kPlaces[this.level];
    this.coworkers.forEach(coworker => { coworker.update(place); });
  }

  render() {
    {
      const hours = Math.floor(this.clock / 60).toString();
      const minutes = (this.clock % 60).toString();
      this.dom.clock.innerText = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    }

    this.dom.money.innerText = this.money + "€";

    {
      let i = 0;
      this.coworkers.forEach(coworker => {
        const balanceSpanId = `coworkerBalance${i}`;
        const span = document.getElementById(balanceSpanId);
        span.innerText = coworker.balance > 0 ? `+${coworker.balance}` : coworker.balance;
        i++;
      });
    }
  }
}


function main() {
  const game = new Game();
  game.render();
  window.setInterval(() => {
    game.update();
    game.render();
  }, 1000);
}

window.addEventListener('load', main)
