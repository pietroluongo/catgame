import { parse } from "svg-parser";

const MM_TO_PX = 3.7795275591;

const map =
  '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!-- Created with Inkscape (http://www.inkscape.org/) -->\n\n<svg\n   width="10240"\n   height="10240"\n   viewBox="0 0 2709.3333 2709.3333"\n   version="1.1"\n   id="svg5"\n   sodipodi:docname="mapTest.svg"\n   inkscape:version="1.1 (c68e22c387, 2021-05-23)"\n   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\n   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\n   xmlns="http://www.w3.org/2000/svg"\n   xmlns:svg="http://www.w3.org/2000/svg">\n  <sodipodi:namedview\n     id="namedview7"\n     pagecolor="#ffffff"\n     bordercolor="#666666"\n     borderopacity="1.0"\n     inkscape:pageshadow="2"\n     inkscape:pageopacity="0.0"\n     inkscape:pagecheckerboard="0"\n     inkscape:document-units="px"\n     showgrid="false"\n     units="px"\n     inkscape:zoom="0.08"\n     inkscape:cx="7618.75"\n     inkscape:cy="3556.25"\n     inkscape:window-width="1920"\n     inkscape:window-height="1009"\n     inkscape:window-x="1912"\n     inkscape:window-y="-8"\n     inkscape:window-maximized="1"\n     inkscape:current-layer="layer1" />\n  <defs\n     id="defs2" />\n  <g\n     inkscape:label="Camada 1"\n     inkscape:groupmode="layer"\n     id="layer1">\n    <rect\n       style="fill:#0000ff;fill-rule:evenodd;stroke-width:0.264583"\n       id="rect31"\n       width="668.07294"\n       height="429.94791"\n       x="1944.6873"\n       y="327.42188" />\n    <rect\n       style="fill:#0000ff;fill-rule:evenodd;stroke-width:0.264583"\n       id="rect123"\n       width="668.07294"\n       height="429.94791"\n       x="33.072918"\n       y="39.687511" />\n    <rect\n       style="fill:#0000ff;fill-rule:evenodd;stroke-width:0.264583"\n       id="rect125"\n       width="668.07294"\n       height="429.94791"\n       x="863.203"\n       y="281.11978" />\n  </g>\n</svg>\n';

interface MapBlock {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface MapData {
  blocks: Array<MapBlock>;
}

const getMapData = (): Array<MapBlock> => {
  const parsedData: any = parse(map);
  const ret = parsedData.children[0].children[2].children;
  console.log(ret);
  const blockData: Array<MapBlock> = ret.map((dat) => dat.properties);

  console.log("blockdata is ", blockData);
  const cleansed: Array<MapBlock> = blockData.map((block) => ({
    x: block.x * MM_TO_PX,
    y: block.y * MM_TO_PX,
    width: block.width * MM_TO_PX,
    height: block.height * MM_TO_PX,
  }));

  console.log("cleansed is ", cleansed);
  return cleansed;
  //   return blockData.map((data) => {
  //     x: data.x * MM_TO_PX;
  //     ...CharacterData
  //   });
};

export default getMapData;
