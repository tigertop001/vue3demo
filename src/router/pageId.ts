/**
 * 每个页面对应的模板ID
 */
// import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
// import { useGlobalPlatInfoStore } from '@/stores/modules/globalPlatInfoStore'
import tempData from '@/data/tempData'

/**
 * 获取当前页面的模板编号
 * @param page
 */
export const getPageId = (page: string) => {
  // const storePlat = useGlobalPlatInfoStore()
  // console.log('storePlat-获取当前页面的模板编号', storePlat, '---end')
  // const { platTempPageIdH5 } = storeToRefs(storePlat)
  // console.log('storePlat-获取当前页面的模板编号01---', platTempPageIdH5)
  // const arr = platTempPageIdH5.value
  const arr = tempData.data.platFunctions
  // const arr = []
  console.log('***----****', arr)
  // console.log('storePlat-获取当前页面的模板编号02---', arr)
  let id = 1
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].characterData == page && typeof arr[i].pageCode === 'string') {
      // const splitTemplateNumber = arr[i].pageCode ? arr[i].pageCode.split('-') : []
      const splitTemplateNumber = (arr[i].pageCode as string).split('-')
      console.log('***splitTemplateNumber-***01*', splitTemplateNumber)
      if (splitTemplateNumber.length === 3) {
        console.log(splitTemplateNumber,'***splitTemplateNumber-***02*', splitTemplateNumber.length)
        id = parseInt(splitTemplateNumber[2], 10)
        console.log('***id-***03*', id)
        break
      }
      console.log('***id-***04*', id)
    }
  }
  if (page != '1') console.log(`当前多模版页面使用编号: m-${page}-${id}`)
  return id
}

/**
 * 获取底部tab 悬浮栏 的模板编号
 */
export const tabFixedId = computed(() => {
  // const storePlat = useGlobalPlatInfoStore()
  // const { isCard, isSport, isXjTy, isTurnOnEditPlatType } = storeToRefs(storePlat)
  // 后端返回导航栏编号对应前端模板编号
  const backId = getPageId('1') // 后端返回导航栏编号
  console.log('backId**', backId)
  return backId
})

export type AsyncPageList = {
  [key: string]: Function
}

/**
 * 获取当前页面显示哪个模板
 * @param asyncPageList 页面模板配置编号对象
 */
export function usePageId(asyncPageList: AsyncPageList) {
  const route = useRoute()
  const currentRouteName = (route.meta.page || '') as string
  const template = computed(() => {
    const temp = 't' + getPageId(currentRouteName)
    console.log('++++temp+++', temp)
    // 如果后端返回模板编号万一有错误，我们前端没有这个模板，就默认显示模版1
    return asyncPageList[temp] ? temp : Object.keys(asyncPageList)[0]
  })
  return {
    template,
    templates: asyncPageList
  }
}
