import {FC, SVGProps} from "react";
import dynamic from "next/dynamic";

interface IUserUploadedSvg extends SVGProps<SVGElement>{
  path: string
}

const AssetSVG: FC<IUserUploadedSvg> = ({path, ...rest}) => {
  const matchResult = /\/assets\/(.+)\.svg/.exec(path)
  if(matchResult){
    const [, fileName] = matchResult
    const SVG = dynamic(() => import(`@files/assets/${fileName}.svg`))
    return <SVG {...rest}/>
  }
  return null;
}

export default AssetSVG