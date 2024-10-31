/**
 * 接口数据缓存 数据库
 */
import { openDB } from '@/utils/indexDBInstance'
import { isSupportIndexDb } from '@/utils/is'

// 数据库名称
export const dbNameRequest = 'dbNameRequest'
// 数据库版本号
export const dbVersionRequest = 1
// 创建一般apiRequestName数据库
export const apiRequestName = 'apiRequestName'

let dbPromise
export async function openDbInitRequest(name: string, version = 1) {
  try {
    if (!isSupportIndexDb()) {
      console.warn('IndexedDB not supported')
      return
    }
    if (dbPromise) return dbPromise
    dbPromise = await openDB(name, version, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          // 创建一般apiRequestName数据库
          db.createObjectStore(apiRequestName)
        }
      }
    })
    return dbPromise
  } catch (e) {
    throw new Error(e)
  }
}

/**
 * 删除 db
 */
export async function deleteDBRequest() {
  try {
    if (!isSupportIndexDb()) {
      return
    }
    deleteDBRequestStore()
  } catch (e) {
    throw new Error(e)
  }
}

// 后台返回数据，根据 key 值取接口返回数据
export async function getRequestData(key) {
  return (await openDbInitRequest(dbNameRequest, dbVersionRequest))?.get(apiRequestName, key)
}
// 后台返回数据，根据 key 值 保存接口返回数据
export async function setRequestData(key, val) {
  return (await openDbInitRequest(dbNameRequest, dbVersionRequest))?.put(apiRequestName, val, key)
}
export async function deleteDBRequestStore() {
  ;(await openDbInitRequest(dbNameRequest, dbVersionRequest))?.clear(apiRequestName)
  // const keys = await getAllRequestKeys();
  // console.log(keys);
  // // console.log(keys);
  // for (let i = 0; i < keys.length; i++) {
  //   (await dbPromise)?.delete(apiRequestName, keys[i]);
  // }
}
export async function getAllRequestKeys() {
  return (await openDbInitRequest(dbNameRequest, dbVersionRequest))?.getAll(apiRequestName)
}
