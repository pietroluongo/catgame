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

export const ENEMY_SHOOT_BASE_SPEED = 1000;

export const ENEMY_SHOOT_DELAY = 100;

export const ENEMY_BASE_SHOOT_DISTANCE = 100;

export const ENEMY_MAX_ACCELERATION = 1000;

export const ENEMY_MAX_SPEED = 500;

export const ENEMY_BASE_SIZE = 0.85;

export const PLAYER_BASE_SHOT_SIZE = 1.2;
