'use strict';

const PINS_COUNT = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const URLS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const PINS_WIDTH = 50;
const PINS_HEIGHT = 70;

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItem = (items) => {
  let rand = Math.floor(Math.random() * items.length);
  return items[rand];
};

const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

const getRandomArray = (items) => {
  shuffle(items);
  return items.slice(0, getRandomInteger(1, items.length));
};

const generatePins = () => {
  const pins = [];

  for (let i = 1; i <= PINS_COUNT; i++) {
    const coordinates = {x: getRandomInteger(0, 1200), y: getRandomInteger(130, 630)};
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
const map = document.querySelector(`.map`);
const pinsBlock = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const mapToggle = () => {
  if (map.classList.contains(`map--faded`)) {
    map.classList.remove(`map--faded`);
  } else {
    map.classList.add(`map--faded`);
  }
};
mapToggle();

const renderPinsToMap = () => {
  const fragment = document.createDocumentFragment();

  for (let element of pins) {
    const newPin = pinTemplate.cloneNode(true);
    newPin.style.left = element.location.x + PINS_WIDTH / 2 + `px`;
    newPin.style.top = element.location.y + PINS_HEIGHT + `px`;

    const imageInPin = newPin.querySelector(`img`);
    imageInPin.src = element.author.avatar;
    imageInPin.alt = element.offer.title;
    fragment.appendChild(newPin);


  }

  pinsBlock.appendChild(fragment);
};
renderPinsToMap();

const cardTemplate = document.querySelector(`#card`).content.querySelector(`map__card`);
const mapFilters = document.querySelector(`.map__filters-container`);
const POPUP_TYPE = {
  'flat': `Квартира`,
  'bungalo': `Бунгало`,
  'house': `Дом`,
  'palace': `Дворец`
};
const popupFeatures = FEATURES;

const renderCard = (object) => {
  const card = cardTemplate.cloneNode(true);

  card.querySelector(`.popup__title`).textContent = object.offer.title;
  card.querySelector(`.popup__text--address`).textContent = object.offer.address;
  card.querySelector(`.popup__text--price`).textContent = object.offer.price + `₽/ночь`;
  card.querySelector(`.popup__type`).textContent = POPUP_TYPE;
  card.querySelector(`.popup__text--capacity`).textContent = object.offer.rooms + ` комнаты для ` + object.offer.guests + ` гостей`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ` + object.offer.checkin + ` , выезд до ` + object.offer.checkout;
  card.querySelector(`.popup__description`).textContent = object.offer.description;
  card.querySelector(`.popup__photos`) = object.offer.photos;
  card.querySelector(`.popup__avatar`).src = object.author.avatar;

  renderPhotoToCard(object.offer.photos, card);

  return card;
};

mapFilters.before(map);
