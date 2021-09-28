import {isArray, isObject} from "lodash-es";

const optimiseImages = <T extends { [key: string]: any } | unknown[]>(obj: T): T => {
  for (const key in obj) {
    // @ts-ignore
    const value: unknown = obj[key];
    if (typeof value === "string") {
      if (/\/assets\/.*$/.test(value)) {
        if (/\.ico$/.test(value)) {
          continue;
        }
        // const image = sharp(`./public${value}`)
        //   .resize(200, 150)
        //   .on('info', function (info) {
        //     console.log(key, value, info);
        //   })
        //   .webp({quality: 50}).toFile(`./public${value}.tiny.webp`).catch(e => console.error(e, value)).then(() => console.log(value));

      }
    } else if (isObject(value) || isArray(value)) {
      optimiseImages(value)
    }
  }
  return obj
}

export default optimiseImages;