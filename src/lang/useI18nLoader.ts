// import md5 from "js-md5";
// import { isLocalBuild } from "@/utils/env";
import i18n from '@/lang/index'
import { isApp, isSupportIndexDb } from '@/utils/is'
import { openDB } from '@/utils/indexDBInstance'
import { staticDomain, staticPreUrl } from '@/utils/domain'

/** @type {string} 数据库名称 */
const dbName = 'i18nDB'
/** @type {string} 表名称 */
const storeName = 'translations'
/** @type {string[]} 缓存已加载过的语言文件路径 */
const moduleNames: string[] = []
/** @type {string[]} 切换语言后需要加载的语言包模块 */

/**
 * 用来储存indexDb创建后的实例
 * @type {IDBPDatabase}
 */
let db

/**
 * 获取或创建一个 IndexedDB 连接
 * @returns {Promise<IDBPDatabase|null>} 返回数据库实例或null
 */
async function getDB() {
  if (db) return db

  if (!isSupportIndexDb()) {
    console.error('IndexedDB is not supported. Using localStorage.')
    return null
  }

  db = await openDB(dbName, 5, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName)
      }
    }
  })

  return db
}

/**
 * 从数据库 中获取消息
 * @param {string} dbKey - 数据库键
 * @returns {Promise<object|null>} 返回存储的消息或 null
 */
export async function getMessages(dbKey: string): Promise<object | null> {
  const db = await getDB()
  if (db) {
    return await db.get(storeName, dbKey)
  }
}

/**
 * 在数据库 中设置消息
 * @param {string} dbKey - 数据库键
 * @param {object} json - 要存储的消息
 */
export async function setMessages(dbKey: string, json: object) {
  const db = await getDB()
  if (db) {
    await db.put(storeName, json, dbKey)
  }
}

/**
 * 加载 i18n 文件并缓存
 * @param {string} moduleName - 模块名称
 */
export default async function useI18nLoader(moduleName: string) {
  const { locale, messages } = i18n.global
  const module = `${isApp() ? staticDomain.value : staticPreUrl}/lang/${locale.value}/${moduleName}.json`

  if (messages.value[locale.value][moduleName]) {
    pushUniqueToStart(moduleNames, moduleName)
    return
  }

  // const dbKey = md5(module);

  // const cachedMessages = await getMessages(dbKey);
  //
  // if (cachedMessages && !isLocalBuild()) {
  //   setLangMessage(cachedMessages, moduleName);
  //   return;
  // }

  const response = await fetch(module)
  const json = await response.json()
  setLangMessage(json, moduleName)

  // setMessages(dbKey, json);
}

const setLangMessage = (json: any, moduleName: string) => {
  if (!json) return
  const { locale, messages } = i18n.global
  messages.value[locale.value][moduleName] = json
  pushUniqueToStart(moduleNames, moduleName)
}

/**
 * 设置当前语言
 * @param {"vi"|"zh_cn"|"en"} lang - 语言代码
 */
export const setLang = (lang: 'vi' | 'zh_cn' | 'en') => {
  const { locale } = i18n.global
  if (locale.value === lang) return
  locale.value = lang
  moduleNames.forEach((item) => {
    useI18nLoader(item)
  })
}

/**
 * 将指定元素移动到数组开头，确保唯一性。
 * 如果元素已经存在于数组中，则将其从原位置移除。
 *
 * @param {string[]} arr - 字符串数组。
 * @param {string} element - 要移动到数组开头的元素。
 */
function pushUniqueToStart(arr: string[], element: string) {
  const index = arr.indexOf(element)
  if (index !== -1) {
    arr.splice(index, 1)
  }
  arr.unshift(element)
}
