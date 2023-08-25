const kIngameTimeFactor = 1100;
const kMotivationPerHour = 16;
const kMoneyPerHour = 1;
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
  new Place("Bar la Licorne", 2, 1, 'Un endroit convivial mais bruyant.', 4),
  new Place("Dans un local prêté par un ami", 1, 2, 'Un endroit pratique mais un peu austère.', 8),
  new Place("À la CCI", 2, 3, 'Un endroit qui permet de se concentrer et aussi de se détendre.', 16),
  new Place("La Capsule II", 3, 4, 'Les meilleures conditions, à la fois pour travailler et pour prendre une pause', 32),
];

const kCoworkerNames = [
  ['Alexandra Lareine', 'F'],
  ['Alexis Bouchouille', 'M'],
  ['Anthony Loyer', 'M'],
  ['Benjamin Dantesque', 'M'],
  ['Chloé Basque', 'F'],
  ['Christine Séjoune', 'F'],
  ['David Tchernia', 'M'],
  ['Elise Brulot', 'F'],
  ['Emilie Dezurich', 'F'],
  ['Gaël Leprince', 'M'],
  ['Guillaume Meunarde', 'M'],
  ['Julien Bruxelles', 'F'],
  ['Manon Facheuse', 'F'],
  ['Margouche Claudel', 'F'],
  ['Nicolas Gilette', 'M'],
  ['Nolwenn Tripp', 'F'],
  ['Paul Cluzet', 'M'],
  ['Philippe Brenardreau', 'M'],
  ['Pierre-Arnaud Brioche', 'M'],
  ['Pierre-Francois Berurier', 'M'],
  ['Pierre-Louis Labenne', 'M'],
  ['Pierre', 'M'],
  ['Sandra Maison', 'F'],
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
    const nameAndSex = randomElementIn(kCoworkerNames);
    const sex = nameAndSex[1];
    const jobTitle = randomElementIn(kJobs)[sex == 'M' ? 0 : 1];
    const jobAdjective = randomElementIn(kJobAdjectives)[sex == 'M' ? 0 : 1];

    this.name = nameAndSex[0];
    this.job = `${jobTitle} ${jobAdjective}`;

    this.motivation = 100;
    this.isWorking = true;
  }

  motivationAsEmoji() {
    const faces = ['😁', '😄', '😃', '😀', '🙂', '😕', '😟', '😰', '🥵', '☠️'].reverse();
    const faceIndex = Math.round((faces.length - 1) * this.motivation / 100);
    return faces[faceIndex];
  }

  motivationAsText() {
    const maxBlocks = 20;
    const nbBlocks = Math.round(this.motivation / 100 * maxBlocks);
    const blocks = ''.padEnd(nbBlocks, '#');

    return `[${blocks.padEnd(maxBlocks, '_')}]`;
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
        const buttonText = coworker.isWorking ? 'Faire une pause 🎯' : 'Travailler 💼';
        this.dom.coworkers[i].innerHTML = `<b>Nom:</b>
          <br/>${coworker.name}
          <br/><b>Métier:</b>
          <br/>${coworker.job}
          <br/><b>Motivation:</b> <span id="coworkerEmoji${i}">${coworker.motivationAsEmoji()}</span>
          <br/><span id="coworkerMotivation${i}">${coworker.motivationAsText()}</span>
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
          this.refreshHtml();
        }

        now = performance.now();
      } else {
        this.clockMs += ingameDeltaMs;
      }
    }

    // Update work motivation
    {
      this.coworkers.forEach((worker, worker_index) => {
        const is_burntout = (worker.motivation == 0);

        const factor = worker.isWorking ? -1 : 3;
        worker.motivation = Math.max(0, worker.motivation + factor * ingameDeltaMs * (kMotivationPerHour / (3600000)));

        if (worker.motivation == 0 && !is_burntout) {
          this.logEvent(`${worker.name} est en surmenage...`);
        } else if (worker.motivation >= 100) {
          worker.motivation = 100;
          if (!worker.isWorking) {
            onCoworkerClicked(worker_index); // force switch working state and update buttons and log event
          }
        }
      });
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
        const motivationSpan = document.getElementById(`coworkerMotivation${i}`);
        motivationSpan.innerText = coworker.motivationAsText();
        const emojiSpan = document.getElementById(`coworkerEmoji${i}`);
        emojiSpan.innerText = coworker.motivationAsEmoji();
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
  button.setAttribute('value', coworker.isWorking ? 'Faire une pause 🎯' : '💪 Énergisation ! 💪');
  button.disabled = !coworker.isWorking;
}

function useNightMode() {
  const searchParams = new URL(document.URL).searchParams;
  const nightMode = searchParams.has('nightmode');

  return nightMode;
}

function onLoad() {
  if (useNightMode()) {
    const body = document.getElementsByTagName('body')[0];
    body.className = 'night';
  }

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

window.addEventListener('load', onLoad);
