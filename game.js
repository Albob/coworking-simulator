const kIngameTimeFactor = 1100;
const kMotivationPerHour = 16;
const kMoneyPerHour = 4;

let priceOfNewCoworker = 35;

function randomElementIn(collection) {
  const index = Math.floor(Math.random() * collection.length);
  return collection[index];
}

function millisecondsFromHours(hours) {
  return hours * 60 * 60 * 1000;
}

class Place {
  constructor(place_name, place_description, capacity) {
    this.name = place_name;
    this.description = place_description;
    this.capacity = capacity;
  }
}

const kPlaces = [
  new Place(`Bar "La Licorne"`, 'Un endroit convivial mais bruyant.', 4),
  new Place("Dans un local prêté par un ami", 'Un endroit pratique mais un peu austère.', 8),
  new Place("À la CCI", 'Un endroit qui permet de se concentrer et aussi de se détendre.', 16),
  new Place("La Capsule II", 'Les meilleures conditions, à la fois pour travailler et pour prendre une pause', 32),
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

  motivationAsColor() {
    if (this.motivation > 66) return '#00e100'
    else if (this.motivation > 33) return '#d7cb14';
    else return 'red';
  }

  motivationAsBattery(coworker_index) {
    const bar_color = this.motivationAsColor();
    return `
      <div id="coworkerMotivation${coworker_index}" style="display: inline-block; position: relative; top: 4px; height: 16px; width: 50px; border: 2px solid white; border-radius: 6px;">
        <div id="motivationBar${coworker_index}" style="background-color: ${bar_color}; border-radius: 4px; height: 100%; width:100%"></div>
      </div>
    `;
  }
}

class Dom {
  constructor() {
    this.place = document.getElementById('place');
    this.capacity = document.getElementById('capacity');
    this.coworkers = [
      document.getElementById('coworker0'),
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
    this.clockMs = 0;
    this.lastUpdate = performance.now();

    this.refreshHtml();
  }

  refreshHtml() {
    // Place
    const place = kPlaces[this.level];
    this.dom.place.innerHTML = `${place.name}. ${place.description}.`;
    this.dom.capacity.innerHTML = `${this.coworkers.length}/${place.capacity}`;

    // Coworkers
    for (let i = 0; i < place.capacity; ++i) {
      if (i < this.coworkers.length) {
        const coworker = this.coworkers[i];
        const buttonText = coworker.isWorking ? 'Faire une pause 🎯' : 'Travailler 💼';
        this.dom.coworkers[i].innerHTML = `
          <span class="emoji" id="coworkerEmoji${i}">${coworker.motivationAsEmoji()}</span>
          <b>${coworker.name}</b>, ${coworker.job}.
          ${coworker.motivationAsBattery(i)}
          <input type="button" id="toggleCoworker${i}" value="${buttonText}" onClick="onCoworkerClicked(${i})" />`;
      }
    }
  }

  addCoworker() {
    if (this.money < priceOfNewCoworker) {
      alert("Pas assez d'argent");
      return;
    }

    const place = kPlaces[this.level];
    if (place.capacity <= this.coworkers.length) {
      alert("Plus de place! Déménagez pour augmenter la capacité");
      return;
    }

    this.money -= priceOfNewCoworker;
    priceOfNewCoworker = Math.ceil(priceOfNewCoworker * 1.5);
    this.coworkers.push(new Coworker());

    {
      const coworkers_node = document.getElementById('coworkers');
      const new_coworker_node = document.createElement('p');
      new_coworker_node.classList.add("person");
      new_coworker_node.setAttribute("id", "coworker0");
      coworkers_node.appendChild(new_coworker_node);
      this.dom.coworkers.push(new_coworker_node);

      // Move add_coworker node to the end of the node
      const add_coworker_button = document.getElementById('add_coworker');
      coworkers_node.appendChild(add_coworker_button);

      const place = kPlaces[this.level];
      if (place.capacity <= this.coworkers.length) {
        add_coworker_button.style.display = 'none';
      }
    }

    this.refreshHtml();
  }

  setNewCoworkerPrice() {
    const button = document.getElementById('add_coworker')
    button.setAttribute('value', `Ajouter un coworker (${priceOfNewCoworker}€)`);
  }

  update(now) {
    const deltaMs = now - this.lastUpdate;
    const ingameDeltaMs = deltaMs * kIngameTimeFactor;
    this.clockMs += ingameDeltaMs;

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
      const nb_active_workers = this.coworkers.reduce((count, worker) => count + (worker.isWorking && worker.motivation > 0 ? 1 : 0), 0);
      this.money += nb_active_workers * ingameDeltaMs * (kMoneyPerHour / (3600000));
    }

    this.lastUpdate = now;
  }

  render() {
    {
      const place = kPlaces[this.level];
      const chargeSpan = document.getElementById('capacity');
      chargeSpan.innerHTML = `${this.coworkers.length}/${place.capacity}`;
    }

    this.dom.money.innerText = Math.floor(this.money) + "€";

    {
      let i = 0;
      this.coworkers.forEach(coworker => {
        const motivationBar = document.getElementById(`motivationBar${i}`);
        motivationBar.style.width = `${coworker.motivation}%`;
        motivationBar.style.backgroundColor = `${coworker.motivationAsColor()}`;
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

function onLoad() {
  game = new Game();
  window.game = game;
  window.onCoworkerClicked = onCoworkerClicked;

  {
    const button = document.getElementById('add_coworker');
    button.addEventListener('click', () => game.addCoworker());
    game.setNewCoworkerPrice();
  }

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
