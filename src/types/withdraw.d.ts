export type GameLineType = {
  id: number;
  name: string;
  amount: string;
  disabled?: boolean;
  thirdLobby?: boolean;
};

export type TransferLineParamType = {
  turnOutLineId: number;
  tochangeIntoLineId: number;
  transferAmount: string | number;
  // 请求资产总额
  fetchTotal?: boolean;
  // 提示 转账成功
  tip?: boolean;
};

export type LineAmountOptionsType = {
  // 改变store state 里的值
  changeStore?: boolean;
};

export type AssetsRecycleOptionsType = {
  showTip?: boolean;
  assetsTotal?: boolean;
};
