const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const getImg = function () {
  for (let i = 1; i <= 8; i++) {
    var s = '0' + 'i';
    return s;
  }
}

const getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItem = function () { };

const getRandomArray = (items) => {
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  for (let i = 0; i < 1000000; i++) {
    let array = [1, 2, 3];
    shuffle(array);
    count[array.join('')]++;
  }

  let clip = items.slice(0, getRandomInteger(1, items.length));
  return clip;
}

const generatePins = function () {
  const pins = [];

for (let i = 1; i <= 8; i++) {
  const pinItem = {
    "author": {
      // "avatar": img / avatars / user 'getImg' .png,
    },
    "offer": {
      "title": 'Title of offer',
      "address": "600, 350",
      "price": getRandomInteger(1000, 10000),
      "type": getRandomItem(TYPES),
      "rooms": getRandomInteger(1, 3),
      "guests": getRandomInteger(1, 5),
      "checkin": getRandomItem(TIME),
      "checkout": getRandomItem(TIME),
      "features": getRandomArray(FEATURES),
      "description": 'some description',
      "photos": [
        "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
        "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
        "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
      ]
    },
    "location": {
      "x": getRandomInteger(0, 1200),
      "y": getRandomInteger(130, 630).
    }
  };
  pins.push(pinItem);
}
return pins;
};

const pins = generatePins;

// userDialog.classList.remove('.map--faded');
