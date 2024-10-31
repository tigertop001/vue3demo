import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { computed, ref } from 'vue'
import { setLayout, setTheme, theme, ThemeEnum } from '@/theme'
import {
  SIMPLE_PAGE_ARR,
  IMMEDIATE_PAGE_ARR,
  INFINITY_AGE_ARR,
  DOG_PAGE_ARR
} from '@/enums/pageIdEnum'
// import { platTypeEnum, templateTypeEnum } from '@/enums/platTypeEnum'
import { getPageId } from '@/router/pageId'

export const useGlobalPlatInfoStore = defineStore('globalPlatInfo', () => {
  const platInfoKey = 'platInfo'
  // 平台信息
  const platInfo: Ref<PlatInfoType> = useStorage(platInfoKey, {
    touristLoginFlag: false,
    unlimitAgentEnabled: false,
    templateNumber: 0,
    cnzz: ''
  })
  const _isTurnOnEditPlatType = useStorage('isTurnOnEditPlatType', false)
  // 是否在测试环境和本地开发环境中，前端修改平台类型，方便测试人员测试和开发人员调试
  const isTurnOnEditPlatType = computed({
    get() {
      if (isLocalBuild()) {
        return _isTurnOnEditPlatType.value
      } else {
        return false
      }
    },
    set(val) {
      // 非本地开发环境不允许切换
      if (isLocalBuild() && val != _isTurnOnEditPlatType.value) {
        _isTurnOnEditPlatType.value = val
      }
    }
  })
  // 是否是棋牌平台
  const isCard = computed(() => {
    return platInfo.value?.type == platTypeEnum.qiPai
  })
  // 是否是现金网(三个：现金网的普通模板，现金网的电子, 现金网的体育, 体育站)
  const isXj = computed(() => {
    return !platInfo.value?.type || platInfo.value?.type == platTypeEnum.xianJin
  })
  // 是否是现金网的普通站点，即“非现金网的电子”， “非现金网的体育”
  const isXjNormal = computed(() => {
    return isXj.value && !isXjSlot.value && !isXjTy.value && !isSport.value
  })
  // 是否是现金网的电子
  const isXjSlot = computed(() => {
    return isXj.value && platInfo.value?.templateNumber == 8
  })
  // 是否是现金网的体育
  const isXjTy = computed(() => {
    return isXj.value && platInfo.value?.templateNumber == 9
  })
  // 是否新版 体育站
  const isSport = computed(() => {
    return isXj.value && platTempConfig.value.platType == templateTypeEnum.sportTemp
  })
  // 后台系统 是否 配置了多模板, 没有配置会走之前老的模板配置
  const isMultiple = computed(() => {
    return platTempConfig.value.platFunctions.length > 0
  })

  // 加载接口
  const platLoading = ref(false)
  // 请求平台信息
  async function fetchPlatInfo(option?: PlatInfoOption) {
    try {
      // if (platLoading.value) return;
      platLoading.value = true
      const promises = <any>[fetchPlatTemp()]
      promises.push(fetchPlatInfoH5(option))
      await Promise.all(promises)
      setPlatInfoH5()
      setPlatInfoPc()
      setPageId()
      //todo
      setLayout(getPageId('3'))
    } catch (e) {
      // throw new Error(e);
    }
    platLoading.value = false
  }

  //todo
  // setLayout(getPageId("3"));

  // 后端返回原始数据
  const platTempConfig = useStorage<PlatTemplateConfig>('platTempConfig', {
    platType: '',
    platFunctions: []
  })
  // 已请求过，就不请求了
  let hasTemp = false
  /**
   * 请求多模板 配置信息
   */
  async function fetchPlatTemp() {
    try {
      if (hasTemp) return
      const res = await getPlatTemp({ terminalType: isPc() ? 2 : 1 })
      hasTemp = true
      if (!isTurnOnEditPlatType.value) {
        if (res?.platType) {
          platTempConfig.value.platType = res.platType
          platTempConfig.value.platFunctions = res.platFunctions
        }
      } else {
        platTempConfig.value.platFunctions = []
      }
    } catch (e) {
      // throw new Error(e);
    }
  }
  // 多模板的每个页面编号数组
  const platTempPageIdH5 = useStorage('platTempPageIdH5', [])
  /**
   * 设置每个页面的多模板编号
   */
  function setPageId() {
    console.log('isMultiple.value--01--', isMultiple.value)
    if (isMultiple.value) {
      // 如果后端返回了数据，说明这个平台的模板编号要取 这个新的页面编号
      platTempPageIdH5.value = platTempConfig.value.platFunctions
      console.log('isMultiple.value--02--', platTempPageIdH5.value)
    } else {
      console.log('isMultiple.value--03--')
      // 如果后端没返回，说明这个平台还是老的平台，模板编号还没有迁移到新的多模板配置上来，需要前端根据 平台类型 先用写死编号代替
      if (isCard.value) {
        platTempPageIdH5.value = SIMPLE_PAGE_ARR
      } else if (isXjSlot.value) {
        platTempPageIdH5.value = IMMEDIATE_PAGE_ARR
      } else if (isXjTy.value) {
        platTempPageIdH5.value = INFINITY_AGE_ARR
      } else if (isSport.value) {
        platTempPageIdH5.value = DOG_PAGE_ARR
      } else {
        // 普通平台
        console.log('isMultiple.value--04--')
        platTempPageIdH5.value = SIMPLE_PAGE_ARR
      }
    }
  }
  // SIMPLE_PAGE_ARR,
  // IMMEDIATE_PAGE_ARR,
  // INFINITY_AGE_ARR,
  // DOG_PAGE_ARR
  // 后端返回原始数据
  const platInfoH5 = ref<PlatInfoType>()
  /**
   * 请求 h5 平台信息
   * @param option
   */
  async function fetchPlatInfoH5(option?: PlatInfoOption) {
    try {
      platInfoH5.value = await getPlatInfo({ device: '1' }, option)
    } catch (e) {
      // throw new Error(e);
    }
  }
  // 非产线环境读取本地设置
  const templateNumber = useStorage('templateNumber', 1)
  // 平台类型
  const platType = useStorage('platType', 1)
  // setLayOut();
  /**
   * 设置h5平台信息
   */
  function setPlatInfoH5() {
    // if (isPc()) return
    if (!platInfoH5.value?.tenantPlatId) {
      setThemeH5()
      return
    }
    const res = platInfoH5.value
    if (isTurnOnEditPlatType.value) {
      res.templateNumber = templateNumber.value
      res.type = platType.value
    }
    platInfo.value = res
    // setLayOut();
    // if (
    //   !isLocalBuild() &&
    //   !isXjSlot.value &&
    //   !isFourInside() &&
    //   !isMobileBrowser() &&
    //   !isSport.value
    // ) {
    //   // 如果不是电子站, 不是三方嵌入产品，, 不是新体育（新体育暂时还没有pc）非移动端跳转到pc
    //   window.location.href = window.location.origin + window.location.search
    // }
    setThemeH5()
  }
  function setThemeH5() {
    // 便于本地切换主题，调试代码，而不用去改代码或者后台配置
    console.log('--便于本地切换主题，调试代码，而不用去改代码或者后台配置--')
    if (!isTurnOnEditPlatType.value) {
      if (isCard.value) {
        setTheme(ThemeEnum.chess)
      } else if (isSport.value) {
        // 本期第一版多模板上线的体育站 暂时根据模板类型，前端设置主题色，后期后台系统再扩展主题色配置功能
        if (theme.value != ThemeEnum.blueCobalt) {
          setTheme(ThemeEnum.blueCobalt)
        }
      } else if (platInfo.value?.styleNumber == 2) {
        if (theme.value != ThemeEnum.goldDark) {
          setTheme(ThemeEnum.goldDark)
        }
      } else if (platInfo.value?.styleNumber == 7) {
        if (theme.value != ThemeEnum.blueLight) {
          setTheme(ThemeEnum.blueLight)
        }
      } else if (platInfo.value?.styleNumber == 3) {
        if (theme.value != ThemeEnum.blueDark) {
          setTheme(ThemeEnum.blueDark)
        }
      } else if (theme.value != ThemeEnum.blueLight) {
        setTheme(ThemeEnum.blueLight)
      }
    } else {
      setTheme(theme.value)
    }
  }
  /**
   * 此处用于首页功能控制
   */
  // function setLayOut() {
  //   if (isXjTy.value) {
  //     setLayout(5);
  //   } else {
  //     setLayout(3);
  //   }
  // }

  // 后端返回原始数据
  const platInfoPc = ref<PlatInfoType>()
  //pc端模板编号
  const pcTemplateNumber = useStorage<PcTemplateNumberType>('pcTemplateNumber', {
    templateNumber: 0,
    styleNumber: 0
    // templateId: 1,
  })
  // 后端返回原始数据
  const pcTemplateNumberOrigin = ref<PcTemplateNumberType>()
  /**
   * 获取 pc 平台信息和模板
   * @param option
   */
  async function fetchPlatInfoPc(option?: PlatInfoOption) {
    try {
      const promises = <any>[
        getPlatInfo({ device: '2' }, option),
        getPlatTemplateInfoPcApi({ deviceType: 2 })
      ]
      const res = await Promise.all(promises)
      platInfoPc.value = res[0]
      pcTemplateNumberOrigin.value = res[1]
      // 如果pc端多模板出来之后，再修改此处的模板编号设置，目前通过后端返回模板1、2、3编号控制页面编号
    } catch (e) {
      // throw new Error(e);
    }
  }
  /**
   * 设置 pc 主题和模板
   */
  function setPlatInfoPc() {
    if (!isPc() || !platInfoPc.value?.tenantPlatId) return
    if (isTurnOnEditPlatType.value) {
      pcTemplateNumber.value == pcTemplateNumberOrigin.value
      if (pcTemplateNumber.value.templateNumber == 2) {
        // 模板2 设为黑色
        setTheme(ThemeEnum.pcGoldDark)
      } else {
        setTheme(ThemeEnum.pcGoldLight)
      }
    }
    platInfo.value = platInfoPc.value
  }

  // 是否显示维护中
  const showMaintain = ref(false)
  // 维护中内容
  const maintainTip = ref('')
  // app中使用，显示接口网络异常，弹出让用户切换接口地址弹框和复制日志按钮
  const showApiError = ref(false)
  // 错误日志内容
  const errorLog = ref('')
  const openInstallConfig = ref({
    installInitFlag: false
  })
  // 平台信息是否已经有请求过一次
  const showSourceLoading = computed(() => {
    return !platInfo.value?.tenantPlatId
  })
  // 平台是否开启全民代理
  const allAgentEnabled = computed(() => {
    return platInfo.value?.rebateAgentEnabled === true && platInfo.value?.allAgentEnabled === true
  })
  return {
    platInfo,
    platLoading,
    allAgentEnabled,
    fetchPlatInfo,
    showSourceLoading,
    showMaintain,
    maintainTip,
    showApiError,
    errorLog,
    openInstallConfig,
    //
    templateNumber,
    isCard,
    // 现金网
    isXj,
    isXjNormal,
    isXjSlot,
    isXjTy,
    // 体育站
    isSport,
    setPageId,
    pcTemplateNumber,
    platType,
    isTurnOnEditPlatType,
    isMultiple,
    platTempPageIdH5,
    platTempConfig
  }
})
