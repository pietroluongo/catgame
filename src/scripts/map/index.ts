import { parse } from "svg-parser";

const MM_TO_PX = 3.7795275591;

interface MapBlock {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface MapData {
  blocks: Array<MapBlock>;
}

const getMapData = (mapString: string): Array<MapBlock> => {
  const parsedData: any = parse(mapString);
  const blockData: Array<MapBlock> =
    parsedData.children[0].children[2].children.map((dat) => dat.properties);

  const mapDataInPx: Array<MapBlock> = blockData.map((block) => ({
    x: block.x * MM_TO_PX,
    y: block.y * MM_TO_PX,
    width: block.width * MM_TO_PX,
    height: block.height * MM_TO_PX,
  }));

  return mapDataInPx;
};

export default getMapData;
