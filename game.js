const kAppVersion = "0.0.3";

const kIngameTimeFactor = 1100;
const kBalancePerHour = 32;
const kMoneyPerHour = 1;
const kMembershipCost = 35;
const kFirstHour = 8;
const kLastHour = 18;

function randomElementIn(collection) {
  const index = Math.floor(Math.random() * collection.length);
  return collection[index];
}

function millisecondsFromHours(hours) {
  return hours * 60 * 60 * 1000;
}

class Place {
  constructor(place_name, cosy_rate, equipement_rate, place_description, capacity) {
    this.name = place_name;
    this.cosyRate = cosy_rate;
    this.equipementRate = equipement_rate;
    this.description = place_description;
    this.capacity = capacity;
  }
}

const kPlaces = [
  new Place("Bar la Licorne", 2, 1, 'Un endroit convivial mais bruyant.', 3),
  new Place("Dans un local prêté par un ami", 1, 2, 'Un endroit pratique mais un peu austère.', 8),
  new Place("À la CCI", 2, 3, 'Un endroit qui permet de se concentrer et aussi de se détendre.', 15),
  new Place("La Capsule II", 3, 4, 'Les meilleures conditions, à la fois pour travailler et pour prendre une pause', 30),
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
}

class Dom {
  constructor() {
    this.place = document.getElementById('place');
    this.clock = document.getElementById('clock');
    this.calendar = document.getElementById('calendar');
    this.coworkers = [
      document.getElementById('coworker0'),
      document.getElementById('coworker1'),
      document.getElementById('coworker2'),
      document.getElementById('coworker3'),
      document.getElementById('coworker4'),
      document.getElementById('coworker5'),
      document.getElementById('coworker6'),
      document.getElementById('coworker7'),
      document.getElementById('coworker8'),
      document.getElementById('coworker9'),
    ];
    this.money = document.getElementById('money');
  }
}

class Game {
  constructor() {
    this.coworkers = [new Coworker()];
    this.money = 0;
    this.level = 0;
    this.dom = new Dom();
    this.clockMs = millisecondsFromHours(kFirstHour);
    this.day = 1;
    this.lastUpdate = performance.now();

    this.refreshHtml();
  }

  refreshHtml() {
    // Place
    const place = kPlaces[this.level];
    this.dom.place.innerHTML = `Nom: ${place.name}<br/>
      Description: ${place.description}<br/>
      Charge: <span id="place_charge">${this.coworkers.length}/${place.capacity}</span>`;

    // Coworkers
    for (let i = 0; i < place.capacity; ++i) {
      if (i < this.coworkers.length) {
        const coworker = this.coworkers[i];
        const buttonText = coworker.isWorking ? 'Faire une pause' : 'Travailler';
        this.dom.coworkers[i].innerHTML = `Nom: ${coworker.name}
          <br/>Métier: ${coworker.job}
          <br/>Equilibre: <span id="coworkerBalance${i}">${coworker.balance}</span>
          <br/><input type="button" id="toggleCoworker${i}" value="${buttonText}" onClick="onCoworkerClicked(${i})" />`;
      } else {
        this.dom.coworkers[i].innerHTML = "Vide";
      }
    }
  }

  update(now) {
    const deltaMs = now - this.lastUpdate;
    const ingameDeltaMs = deltaMs * kIngameTimeFactor;
    const place = kPlaces[this.level];

    // Update clock / time of day
    {
      if (this.clockMs > millisecondsFromHours(kLastHour)) {
        const displayTime = `${kLastHour.toString().padStart(2, '0')}:00`;
        this.logEvent(`Fin de la journée #${this.day}, il est ${displayTime} !`);
        this.logEvent(`La Capsule fait parler d'elle et un nouveau coworker rejoint l'association!`);
        this.day += 1;
        this.clockMs = millisecondsFromHours(kFirstHour);

        // add a new coworker
        if (this.coworkers.length < place.capacity) {
          const newbie = new Coworker();
          this.coworkers.push(newbie);
          this.money += kMembershipCost;
          this.refreshHtml();
        }

        now = performance.now();
      } else {
        this.clockMs += ingameDeltaMs;
      }
    }

    // Update work balance
    {
      const nbCoworkersBefore = this.coworkers.length;

      this.coworkers = this.coworkers.filter(worker => {
        const factor = worker.isWorking ? 1 : -1;
        // const effect = worker.isWorking ? place.equipementRate : place.cosyRate;
        worker.balance += factor * ingameDeltaMs * (kBalancePerHour / (3600000));

        if (Math.abs(worker.balance) > 100) {
          const cause = worker.balance > 0 ? 'travail' : 'glandouille';
          this.logEvent(`${worker.name} a fait un surmenage par excès de ${cause}`);
          this.logEvent(`${worker.name} demande un remboursement de sa cotisation. Vous perdez ${kMembershipCost}€`);
          this.money -= kMembershipCost;
          return false;
        }

        return true
      });

      const nbCoworkersAfter = this.coworkers.length;
      if (nbCoworkersAfter == 0) {
        window.location.replace("game_over.html");
        return;
      } else if (nbCoworkersAfter != nbCoworkersBefore) {
        this.refreshHtml();
      }
    }

    // Update money won.
    {
      this.money += this.coworkers.length * ingameDeltaMs * (kMoneyPerHour / (3600000));
    }

    this.lastUpdate = now;
  }

  render() {
    {
      const place = kPlaces[this.level];
      const chargeSpan = document.getElementById('place_charge');
      chargeSpan.innerHTML = `${this.coworkers.length}/${place.capacity}`;
    }

    {
      const minutes = Math.floor(this.clockMs / (60000));
      const displayHours = (Math.floor(minutes / 60) % 24).toString().padStart(2, '0');
      const displayMinutes = (minutes % 60).toString().padStart(2, '0');
      this.dom.calendar.innerText = `Jour ${this.day}`;
      this.dom.clock.innerText = `${displayHours}:${displayMinutes}`;
    }

    this.dom.money.innerText = Math.floor(this.money) + "€";

    {
      let i = 0;
      this.coworkers.forEach(coworker => {
        const span = document.getElementById(`coworkerBalance${i}`);
        const balance = Math.round(coworker.balance);
        const sign = balance > 0 ? '+' : ''; // negative numbers already display a minus sign
        span.innerText = `${sign}${balance}`;
        i++;
      });
    }
  }

  logEvent(text) {
    console.log(text);
  }
}

var game = {};

function onCoworkerClicked(index) {
  const coworker = game.coworkers[index];
  game.logEvent(`${coworker.name} se ${coworker.isWorking ? 'repose' : 'remet au travail'}`);
  coworker.isWorking = !coworker.isWorking;

  const buttonId = `toggleCoworker${index}`;
  const button = document.getElementById(buttonId);
  button.setAttribute('value', coworker.isWorking ? 'Faire une pause' : 'Travailler');
}

function onLoad() {
  window.onCoworkerClicked = onCoworkerClicked;
  window.game = game;
  game = new Game();

  function loop(now) {
    // use the optimum way to do a game loop. See Also: https://developer.mozilla.org/en-US/docs/Games/Anatomy
    window.requestAnimationFrame(loop);
    game.update(now);
    game.render();
  }

  game.render();
  loop(performance.now());
}

window.addEventListener('load', onLoad)
