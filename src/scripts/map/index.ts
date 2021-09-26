import { parse } from "svg-parser";

const MM_TO_PX = 3.7795275591;

interface MapBlock {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface CircleData {
  cx: number;
  cy: number;
  id: string;
  r: number;
  style: string;
}

interface MapSpawner {
  x: number;
  y: number;
  r: number;
}

interface MapData {
  blocks: Array<MapBlock>;
  spawners: Array<MapSpawner>;
}

const getMapData = (mapString: string): MapData => {
  const parsedData: any = parse(mapString);
  const mapData: Array<any> = parsedData.children[0].children[2].children.map(
    (dat) => dat.properties
  );
  const blockData: Array<MapBlock> = mapData.filter((element: { id: string }) =>
    element.id.startsWith("rect")
  );

  const circleData: Array<CircleData> = mapData.filter(
    (element: { id: string }) => element.id.startsWith("path")
  );

  const blockDataInPx: Array<MapBlock> = mapData.map((block) => ({
    x: block.x * MM_TO_PX,
    y: block.y * MM_TO_PX,
    width: block.width * MM_TO_PX,
    height: block.height * MM_TO_PX,
  }));

  const spawnDataInPx: Array<MapSpawner> = circleData.map((spawn) => ({
    x: spawn.cx * MM_TO_PX,
    y: spawn.cy * MM_TO_PX,
    r: spawn.r * MM_TO_PX,
  }));

  return { blocks: blockDataInPx, spawners: spawnDataInPx };
};

export default getMapData;
