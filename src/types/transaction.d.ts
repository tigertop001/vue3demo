/**
 * 交易记录, 交易记录详情页面
 */
// 交易记录，交易类型筛选数组
export type OrderObjectType = {
  id: string;
  label: string;
  statusArr: Array<StatusObjectType>;
  statusArrPlus?: Array<StatusObjectType>;
};
// 交易记录，交易类型，状态对象类型
export type StatusObjectType = {
  id: string;
  label: string;
  colorType: string;
};
