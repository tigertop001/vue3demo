import { setRouteType } from "./getEnv";

const startSetRoute = () => {
  try {
    setRouteType(process.env.routetype || "");
    console.log("设置路由node环境成功", process.env.routetype);
  } catch (error) {
    console.log(error);
  }
};

startSetRoute();
