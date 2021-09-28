enum difficulty {
  easy,
  medium,
  hard,
}

interface MapData {
  name: string;
  path: string;
  difficulty: difficulty;
}

const maps: Array<MapData> = [
  { name: "1", path: "assets/catMap.svg", difficulty: difficulty.hard },
  { name: "2", path: "assets/catMap2.svg", difficulty: difficulty.medium },
  { name: "3", path: "assets/catMap2.svg", difficulty: difficulty.easy },
];

export default maps;
