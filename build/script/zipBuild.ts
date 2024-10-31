// #!/usr/bin/env node
import { zip } from "zip-a-folder";
import { writeJsonFile } from "write-json-file";
import { resolve, join } from "path";
import { parse } from "node-html-parser";
import * as fs from "fs";
import versionDev from "../version_dev.json";
import versionTest from "../version_test.json";
import versionUat from "../version_uat.json";
import versionProd from "../version_prod.json";
import fse from "fs-extra";

function createFold(str: string) {
  try {
    // 创建js 目录, 已存在文件夹，就不再生成
    fs.lstatSync(str);
    return true;
  } catch (e) {
    fs.mkdirSync(str);
    return false;
  }
}

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

const appFold = "dist";

class TestMe {
  static async main() {
    const fileCon = fs.readFileSync(pathResolve("zip/index.html"), "utf8");
    const htmlCon = parse(fileCon);
    const scriptArr = htmlCon.getElementsByTagName("script");
    for (let i = 0; i < scriptArr.length; i++) {
      if (scriptArr[i].attributes) {
        const type = scriptArr[i].attributes?.type;
        if (type === "module") {
          scriptArr[i].parentNode.removeChild(scriptArr[i]);
        }
      }
      scriptArr[i].removeAttribute("nomodule");
    }
    let versionObj = {
      version: "1.0.0",
      updateArr: <Array<any>>[],
      wh: false,
      whTip: "",
      cs: "",
    };
    if (process.env.modeVersion == "dev") {
      versionObj = versionDev;
    } else if (process.env.modeVersion == "test") {
      versionObj = versionTest;
    } else if (process.env.modeVersion == "uat") {
      versionObj = versionUat;
    } else if (process.env.modeVersion == "prod") {
      versionObj = versionProd;
    }
    createFold(appFold);
    // try {
    //   fse.moveSync("zip/images", `${appFold}/images`, { overwrite: true });
    //   // const fold = pathResolve("zip/images");
    //   // // 已存在文件夹，删除
    //   // fs.lstatSync(fold);
    //   // fs.rmSync(fold, { recursive: true, force: true });
    // } catch (e) {
    //   //
    //   console.log(e);
    // }
    // try {
    //   const fold = pathResolve("zip/lang");
    //   // 已存在文件夹，删除
    //   fs.lstatSync(fold);
    //   fs.rmSync(fold, { recursive: true, force: true });
    // } catch (e) {
    //   console.log(e);
    // }

    const imagesPath = pathResolve("zip/images");
    const langPath = pathResolve("zip/lang");

    // Move images folder if it exists
    if (fs.existsSync(imagesPath)) {
      try {
        fse.moveSync(imagesPath, `${appFold}/images`, { overwrite: true });
      } catch (e) {
        console.log("Error moving images folder:", e);
      }
    } else {
      console.log("Images folder does not exist:", imagesPath);
    }

    // Remove lang folder if it exists
    if (fs.existsSync(langPath)) {
      try {
        fs.rmSync(langPath, { recursive: true, force: true });
      } catch (e) {
        console.log("Error removing lang folder:", e);
      }
    } else {
      console.log("Lang folder does not exist:", langPath);
    }

    fs.writeFileSync(pathResolve("zip/index.html"), htmlCon.toString());
    fs.readdir(pathResolve("zip/assets"), async function (err, files) {
      //handling error
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      files.forEach(file => {
        const fileExt = file.split(".").pop();
        const fileDir = join(pathResolve("zip/assets"), file);
        if (fileExt == "js") {
          if (file.indexOf("legacy") === -1) {
            fs.unlinkSync(fileDir);
          }
        }
        if (fileExt == "mobileprovision") {
          fs.unlinkSync(fileDir);
        }
      });
      const zipPath = `${appFold}/${versionObj.version}.zip`;
      await zip(pathResolve("zip"), pathResolve(zipPath));
      await writeJsonFile(pathResolve(`${appFold}/version.json`), {
        version: versionObj.version,
        updateArr: versionObj.updateArr,
        wh: versionObj.wh,
        whTip: versionObj.whTip,
        cs: versionObj.cs,
      });
      fse.moveSync("zip", `${appFold}/zip`, { overwrite: true });
    });
  }
}

TestMe.main();
