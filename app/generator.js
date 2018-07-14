import { generateRandomPoints } from "./geo";

const targetGeoPosition = {
  latitude: 24.8607,
  longitude: 67.0011
};

const radius = 1000;

const parking = {
  id: null,
  __typename: "Parking",
  address: "Eiusmod excepteur nulla eiusmod non.",
  description: "Eiusmod excepteur nulla eiusmod non.",
  images: [],
  latitude: undefined,
  longitude: undefined,
  lessor: {
    id: null,
    __typename: "User",
    email: null,
    firstName: null,
    lastName: null,
    picture: null
  },
  parkingType: "N/A",
  price: 20,
  requireKey: false,
  requirePermit: false,
  accessInstruction: null,
  code: null
};

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generator(max = 10, min = 1) {
  const range = getRandomInt(min, max);

  const array = new Array(range).fill(0).map((_, id) => ({ ...parking, id }));

  const randomGeoPoints = generateRandomPoints(
    targetGeoPosition,
    radius,
    range
  );

  const result = array.map((o, i) => ({
    ...o,
    ...randomGeoPoints[i]
  }));
  console.log(...randomGeoPoints[i], "logging result");
  return result;
}

export function pickGeoPoints(data) {
  const result = data.map(o => o.latitude + "" + o.longitude);
  return result;
}
