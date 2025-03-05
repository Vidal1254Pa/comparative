import fs from "fs";
import path from "path";
import { RootObject } from "./model";
import ParserOcelot from "./parser.ocelot";
const parse = require("json-parse-even-better-errors");

["mobil","public","webapi"].map((dir) => {
  try {
    console.log(dir);
    const jsonRead = fs.readFileSync(
      path.join(__dirname, `../src/assets/${dir}.json`),
      "utf-8"
    );
    const data = parse(jsonRead.toString()) as RootObject;
    const dataGroups: { [key: string]: string[] } = {};
    data.Routes.map((item) => {
      const [_, group] = item.UpstreamPathTemplate.split("/");
      if (dataGroups.hasOwnProperty(group)) {
        dataGroups[group].push(ParserOcelot(item));
      } else {
        dataGroups[group] = [];
        dataGroups[group].push(ParserOcelot(item));
      }
    }).join(",");
    Object.keys(dataGroups).map(key=>{
        if(!fs.existsSync(path.join(__dirname,`../src/assets/out/${dir}/${key}`))){
            fs.mkdirSync(path.join(__dirname,`../src/assets/out/${dir}`,key))
        }
        fs.appendFileSync(path.join(__dirname,`../src/assets/out/${dir}/${key}/${key}.txt`),dataGroups[key].join(","),"utf-8")
    })
  } catch (e) {
    console.log(e);
  }
});
