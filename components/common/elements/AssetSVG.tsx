import React, {FC} from "react";

interface IUserUploadedSvg {
  path: string;
  [prop: string]: unknown
}

const AssetSVG: FC<IUserUploadedSvg> = ({path, ...rest}) => {
  return <img src={path} alt={`Unable to load ${path}`} {...rest}/>
  // Revisit this once suspense is properly implemented server side
  // const matchResult = /\/assets\/(.+)\.svg/.exec(path)
  // if (matchResult) {
  //   const [, fileName] = matchResult
    // const SVG = dynamic(() => import(`@files/assets/${fileName}.svg`), {suspense: true})
    // return <Suspense fallback={null}>
    //   <SVG {...rest}/>
    // </Suspense>
  // }
  // return null;
}

export default AssetSVG