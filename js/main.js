const PINS_COUNT = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const URLS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const coordinates = { x: getRandomInteger(0, 1200), y: getRandomInteger(130, 630)};

const getRandomItem = function (items) {
  var rand = Math.floor(Math.random() * items.length);
    return items[rand];
};

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

const getRandomArray = (items) => {
  shuffle(items)
  return items.slice(0, getRandomInteger(1, items.length));
}

const generatePins = function () {
  const pins = [];

  for (let i = 1; i <= PINS_COUNT; i++) {
    const pinItem = {
      "author": {
        "avatar": `img/avatars/user0${i}.png`,
      },
      "offer": {
        "title": `Title of offer`,
        "address": `location`,
        "price": getRandomInteger(1000, 10000),
        "type": getRandomItem(TYPES),
        "rooms": getRandomInteger(1, 3),
        "guests": getRandomInteger(1, 5),
        "checkin": getRandomItem(TIMES),
        "checkout": getRandomItem(TIMES),
        "features": getRandomArray(FEATURES),
        "description": `some description`,
        "photos": getRandomArray(URLS),
      },
      "location": coordinates
    };
    pins.push(pinItem);
  }
  return pins;
};

const pins = generatePins();
console.log(pins);

const map = document.querySelector(`.map`);
const pinsBlock = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const newPin = pinTemplate.cloneNode(true);
    newPin.style.left = pins[i].coordinates.x + `px`; //+ смещение по X
    newPin.style.top = pins[i].coordinates.y + `px`; //+ смещение по Y

    const imageInPin = newPin.querySelector(`img`);
    imageInPin.src = pins[i].author.avatar;
    imageInPin.alt = pins[i].offer.title;

function mapToggle () {
  if (map.classList.contains(`map--faded`)) {
    map.classList.remove(`map--faded`)
  } else {
    map.classList.add(`map--faded`)
  }
}

function renderPinsToMap (items) {
  const fragment = document.createDocumentFragment();

  for (let element of pins) {
    console.log(newPin);
    fragment.appendChild(newPin);
  }

  pinsBlock.appendChild(fragment);
}
