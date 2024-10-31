import dayjs from "dayjs";
import pkg from "../../package.json";
import versionDev from "../version_dev.json";
import versionTest from "../version_test.json";
import versionUat from "../version_uat.json";
import versionProd from "../version_prod.json";
import { isBuildPc } from "./getEnv";

export function setAppInfo(mode: string) {
  let buildVersion = {
    version: "",
    updateArr: <Array<string>>[],
  };
  if (mode === "test") {
    buildVersion = versionTest;
  } else if (mode === "uat") {
    buildVersion = versionUat;
  } else if (mode === "prod") {
    buildVersion = versionProd;
  } else {
    buildVersion = versionDev;
  }
  const { dependencies, devDependencies, name, version } = pkg;
  const buildNumber = dayjs();
  const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version, buildVersion },
    lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    buildNumber: buildNumber.valueOf().toString(),
    client: isBuildPc() ? "pc" : "h5",
  };
  return {
    __APP_INFO__,
  };
}
