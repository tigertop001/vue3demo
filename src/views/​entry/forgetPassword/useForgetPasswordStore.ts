import { useAwsc } from "@/components/cdAwsc/cdAwsc";
import { navRouter } from "@/router/navRouter";
import updatePasswordApi from "@/views/entry/api/updatePasswordApi";
import { md5Password } from "@/utils/md5";
import { OpFlag } from "@/enums/opFlagEnum";
import checkPhoneApi from "../api/forgetPasswordApi";
import abToast from "@/lib/abToast/abToast";
import { areaCodeStore } from "@/components/cdPhoneLocation/golbalAreaCodeStore";

const useForgetPasswordStore = defineStore("ForgetPasswordStore", () => {
  /**
   * 初始化表单
   *
   * @returns {Object} form - 初始化的表单对象
   * @property {string} form.mobile - 手机号
   * @property {string} form.email - 邮箱
   * @property {string} form.mobileVerifyCode - 手机短信验证码
   * @property {string} form.emailVerifyCode - 邮箱短信验证码
   * @property {string} form.newPwd - 新密码
   * @property {string} form.confirmedPwd - 确认新密码
   */
  const initForm = () => ({ mobile: "", mobileVerifyCode: "", email: "", emailVerifyCode: "", newPwd: "", confirmedPwd: "" });

  // 表单定义
  const form = reactive(initForm());

  // 重置表单
  const resetForm = () => Object.assign(form, initForm());

  // 防水码数据，防水码实例, 是否开启防水码
  const { awscInstance, awscToken, isShowAwsc } = useAwsc();

  // 按钮禁用状态控制
  const canSubmit = computed(() => {
    return checkInfo.value.isChecked;
  });

  // 按钮loading控制器
  const isLoading = ref(false);

  // 获取mobileAreaCode值
  const areaCodeStoreName = areaCodeStore();
  const { mobileAreaCode } = storeToRefs(areaCodeStoreName);

  // 验证码详情
  const checkInfo = ref({
    telephone: "", // 电话
    email: "", // 邮箱
    code: "",
    type: "1",
    isChecked: false,
    opFlag: OpFlag.FORGET_PASSWORD,
    awscTokenObject: ref<AwscInstance>(), // 防水码集合
  });

  // 第一步 下一步
  const step1 = async () => {
    const info = checkInfo.value;
    if (!info.awscTokenObject && isShowAwsc.value) return abToast.text("请滑动滑块验证");
    isLoading.value = true;
    const params = {
      sessionId: isShowAwsc.value ? info.awscTokenObject.sessionId : "",
      sig: isShowAwsc.value ? info.awscTokenObject.sig : "",
      token: isShowAwsc.value ? info.awscTokenObject.token : "",
      mobile: info.telephone,
      mobileVerifyCode: info.code,
      email: info.email,
      emailVerifyCode: info.code,
      mobileAreaCode: mobileAreaCode.value || "86",
      countryCode: "CN",
      type: Number(checkInfo.value.type),
    };
    try {
      await checkPhoneApi(params);
      const query = { mobile: info.telephone, email: info.email, mobileVerifyCode: info.code, emailVerifyCode: info.code };
      navRouter("/forgetStep2", query);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  // 第二步 下一步
  const step2 = async () => {
    const password = {
      newPwd: md5Password(form.newPwd),
      confirmedPwd: md5Password(form.confirmedPwd),
    };

    const params = {
      ...form,
      ...password,
    };
    isLoading.value = true;
    try {
      await updatePasswordApi(params);
      resetForm();
      navRouter("/account/login", { isReplace: true });
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    form,
    awscInstance,
    awscToken,
    isLoading,
    isShowAwsc,
    checkInfo,
    canSubmit,
    step1,
    step2,
  };
});

export default useForgetPasswordStore;
