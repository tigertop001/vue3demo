/**
 * @description:  contentType
 */
export const enum ContentTypeEnum {
  // json
  JSON = "application/json;charset=UTF-8",
  // form-data qs
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data  upload
  FORM_DATA = "multipart/form-data;charset=UTF-8",
}

export const enum HttpMethod {
  GET = "get",
  POST = "post",
}

/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = 1,
  TIMEOUT = 401,
  TYPE = "success",
  // 存款监控378
  DEPOSIT_RISK = 20301,
  ERROR301 = 301,
  // 存款监控 3次存款失败
  DEPOSIT_RISK_3 = 203001,
  // 优惠活动 日常任务 刷新次数太多
  REFRESH_TOO_MUCH = 20703,
  // 绑定手机号
  BIND_MOBILE = 20704,
  // 绑定银行卡
  BIND_BANK = 20706,
  // 绑定虚拟币
  BIND_VIR = 20705,
  // 不符合稽核取款要求
  WITHDRAW_AUDIT = 302,
}
