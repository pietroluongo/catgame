import Phaser from "phaser";

export const randomSignal = () => (Math.random() > 0.5 ? -1 : 1);

export const randomUnsigned = (min: integer, max: integer) =>
  min + Math.floor(Math.random() * (max - min));

export const randomInt = (min: integer, max: integer) =>
  randomSignal() * randomUnsigned(min, max);

export const randomUnsignedFloat = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const CENTER_COORDS = [5100, 5100];

export const SCORE_PER_KILL = 100;
