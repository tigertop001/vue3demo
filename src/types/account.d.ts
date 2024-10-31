/**
 * 三方钱包列表，账户列表 tab 分类
 */
import {paymentMethodEnum} from "@/enums/paymentMethodEnum";
import {CurrencyEnum} from "@/enums/withdrawEnum";

/**
 * @param{string} id 唯一key
 * @param{string} title 标题
 * @param{string} tabName 账户管理列表，三方钱包列表的tab 栏名字
 * @param{string} name 添加账户地址, 如 ddb, usdt 显示文案名称
 * @param{paymentMethodEnum} type 账户类型
 * @param{CurrencyEnum} currency 虚拟币类型
 * @param{number} len 已添加当前类型账户的数量
 * @param{number} limit 可添加最大值
 * @param{Array<any>} list 当前账户列表
 * @param{Ref} icon 当前账户的icon
 * @param{Array<any>} protocol 虚拟币或者三方钱包 协议选择数组
 */
export type AccountItemType = {
  id: number | string;
  title?: string,
  tabName?: string,
  name?: string;
  type: paymentMethodEnum,
  currency?: CurrencyEnum,
  len: number,
  limit?: number,
  list: Array<any>,
  icon?: Ref | string,
  protocol?: Array<any>
}
