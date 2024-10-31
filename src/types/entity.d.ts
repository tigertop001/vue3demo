export interface PlatInfo {
  //APP下载开启标识 true： 是 false : 否
  appDownloadFlag: boolean;
  //玩家注册时的校验码是否开启 true： 是 false : 否
  enableAuthCode: boolean;
  //是否开启图形验证码(true: 是，false: 否)
  enableImgCode: boolean;
  //图形防水码appId
  picAppId: string;
  //是否开启洗码代理
  rebateAgentEnabled: boolean;
  //平台注册类型：1用户账号注册，2手机号 注册(手机号验证码密码 或者手机号 密码),3手机号账号+密码注册（开启所有注册）
  regType: number;
  //true表示开启合营代理申请，false表示平台没有开启合营代理申请
  teamAgentEnabled: boolean;
  //商户id
  tenantId: number;
  //平台id
  tenantPlatId: number | string;
  //平台名称
  tenantPlatName: string;
  //游客登录开启标识 开启：true,关闭：false
  touristLoginFlag: boolean;
  //是否开启无线代理
  unlimitAgentEnabled: boolean;
  //阿里key
  appKey: string;
  //阿里scene
  scene: string;
  cnzz: string;
  // 风格ID
  styleNumber: number | string;
  // 7是普通新版h5模板，8是电子首页模板
  templateNumber: number | string;
  //是否开启 全民代理
  allAgentEnabled: boolean;
}
export interface VerifyCode {
  //0表示不需要图形验证码，1表示需要图形验证码,2表示已发送验证码
  picCodeCheck: number;
}

export interface Register {
  //授权码
  code: string;
  //0表示不需要图形验证码，1表示需要图形验证码,2表示已发送验证码
  picCodeCheck: number;
  //模版4时判断号码是否注册过
  mobileRegistered: boolean;
}

export interface Login {
  //token值
  access_token: string;
  //token类型
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  //所属商户ID
  tenant_id: string;
  license: string;
  //用户ID
  user_id: string;
  //身份类型
  identity_type: string;
  //终端标识
  client_id: string;
  //用户账号
  username: string;
  jti: string;
  //响应码
  code: number;
  //操作是否成功
  success: boolean;
}

export interface Banner {
  //文章ID , jumpCategory = 2 的时候不为空
  articleId: string;
  //游戏线路中文名称
  chName: string;
  //游戏ID
  gameId: string;
  //游戏线路ID,jumpCategory = 3 的时候不为空
  gameLineId: string;
  //游戏线路名称
  gameLineName: string;
  gameName: string;
  gameSeriesName: string;
  //h5是否支持试玩 true 支持 false 不支持
  h5FreePlayFlag: boolean;
  //跳转类型： 1、存款地址 2、文章详情 3、线路名称 4、自定义 5、APP下载 6、代理管理 7、游戏名称
  jumpCategory: string;
  //pc是否支持试玩 true 支持 false 不支持
  pcfreePlayFlag: boolean;
  //图片路径
  picUrl: string;
  thirdLobby: boolean;
  //点击图片跳转路径
  url: string;
}
