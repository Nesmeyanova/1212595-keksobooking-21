const PINS_COUNT = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const URLS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const mapPins = document.querySelector(.map__pins);
const xCoordinates = {
  MIN: 0,
  MAX: 1200,
};
const yCoordinates = {
  MIN: 130,
  MAX: 630,
};

const getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
        "address": "600, 350",
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
      "location": {
        "x": getRandomInteger(xCoordinates.MIN, xCoordinates.MAX),
        "y": getRandomInteger(yCoordinates.MIN, yCoordinates.MAX),
      }
    };
    pins.push(pinItem);
  }
  return pins;
};

const pins = generatePins();
console.log(pins);

document.querySelector('.map').classList.remove(`map--faded`);

const fragment = document.createDocumentFragment();

const similarPin = document.querySelector(`#pin`).content.querySelector(`button`);

for (let element of pins) {
  const newPin = similarPin.cloneNode(true);
  newPin.style = left: {{pins[i].location.x + смещение по X}}px; top: {{pins[i].location.y + смещение по Y}}px;; //??

  const imageInPin = newPin.querySelector(`img`);
  imageInPin.src = pins[i].author.avatar;
  imageInPin.alt = pins[i].offer.title;

  console.log(newPin);

  fragment.appendChild(newPin);
}

mapPins.appendChild(fragment);
