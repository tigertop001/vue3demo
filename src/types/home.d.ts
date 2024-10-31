// 游戏项目 文章 链接跳转 等
export interface IGameItem {
  articleId?: string;
  chName?: string;
  endTime?: string;
  gameId?: string;
  gameLineId?: string;
  gameLineName?: string;
  gameName?: string;
  gameSeriesName?: string;
  h5FreePlayFlag?: boolean; // 是否免费登录游戏
  jumpCategory?: string | number;
  pcfreePlayFlag?: boolean;
  picUrl?: string;
  thirdLobby?: boolean;
  url?: string;
  remark?: string;
  currentName?: string; // 点击进入游戏显示 当前游戏
  screenFlag?: boolean;
  showStyle?: number;
  content?: string;
  name?: string;
  hotGameMaterial?: any;
  hotGameMaterialId?: string;
  newComeGameMaterial?: any;
  newComerMaterialId?: string;
  operationalStatus?: boolean;
  platTask?: any;
  startTime?: string;
  taskId?: string;
  isRecent?: boolean;
  uniqId?: string; // 唯一ID对应原有的idOnly
  isNewComer?: boolean;
  h5ImgUrl?: string;
  isLocalUrl?: boolean;
}

// 登录3方游戏后返回数据
export type ThirdGameLoginDataType = {
  // 免费地址
  freeUrl?: string;
  // 正式玩的地址
  url?: string;
  // 错误提示
  msg: string;
  scriptContent?: string;
  // 0 为成功， 1为失败
  status: string;
};
export type TabsItemType = {
  id: string | number;
  title: string;
  current: number;
  size: number;
  items: Array<any>;
  loading: boolean;
  refreshing: boolean;
  finished: boolean;
  onLoad: Function;
  error: boolean;
  // null 全部 1、今日 2、昨日 3、近3天 4、近7天 5、近10天 6、近15天 7、本月 8、最近60天 9、最近120天
  dataType?: string | number;
  // 总额
  totalAmount?: string | number;
  numberOfBets?: string | number; //投注总次数
  effectiveOfBets?: string | number; //有效投注额
  winnersOfBets?: string | number; //输赢注额
  washAmount?: string | number; // 洗马金额
  backAmount?: string | number; // 反水金额
};

export type TabsListType = Array<TabsItemType>;
export type TabsListGameType = Array<TabsItemGameType>;

export type TabsItemGameType = {
  id: string | number;
  title: string;
  current: number;
  size: number;
  items: Array<any>;
  loading: boolean;
  refreshing: boolean;
  finished: boolean;
  onLoad: Function;
  error: boolean;
  headerModel: Array<any>;
  headerModelActive?: string | number;
  headerLine: Array<any>;
  headerLineActive?: string | number;
  gameLineId?: string | number;
};

export type TabsGetItemGameType = {
  id: string | number;
  title: string;
  current: number;
  size: number;
  items: Array<any>;
  loading: boolean;
  refreshing: boolean;
  finished: boolean;
  onLoad: Function;
  error: boolean;
  headerModel: Array<any>;
  headerModelActive?: string | number;
  headerLine: Array<any>;
  headerLineActive?: string | number;
};
/**
 * 跳转参数
 */
export type JumpGameOptionsType = {
  /**
   * 是否直接新窗口打开
   */
  isOpen?: boolean;
  /**
   *  是否是从banner 点击
   */
  isBanner?: boolean;
  /**
   *  点击游戏列表的 下标
   */
  index?: number;

  wi?: any;
  /**
   *  展示金额提示
   */
  showAmountDialog?: boolean;
};
export interface QueryType {
  current: number;
  size: number;
}
