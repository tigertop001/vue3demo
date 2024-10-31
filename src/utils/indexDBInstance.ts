/**
 * 保证每个数据库连接存在一个IDBDatabase实例，即单例模式
 */
import { openDB as openDB1 } from 'idb'
// 对象，为database name作为对象索引,IDBDatabase为对象属性
const IDBObj = {}
export async function openDB(name, version, obj) {
  if (IDBObj[name]) return IDBObj[name]
  const IDB = await openDB1(name, version, obj)
  IDBObj[name] = IDB
  return IDB
}
