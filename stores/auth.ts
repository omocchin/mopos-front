import { requestCompanyLogin, requestCompanyLogout, requestSettings, type CompanyLoginResponse, type SettingsResponse } from "#imports"
import { CustomError } from "~/utils/classes/customs"
import { type ErrorResponse } from "~/utils/interfaces/errors"
// import { useUserStore } from '~/stores/user'

interface UserInfo {
  name: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>('')
  const companyId = ref<string>('')
  const companyName = ref<string>('')
  const users = ref<Array<UserInfo>>([])
  const settings = ref<SettingsResponse>()
  const userStore = useUserStore()
  const { addActiveUser, emptyActiveUser, removeCurrentUser } = userStore

  const setToken = (tokenVal: string) => {
    token.value = tokenVal
  }
  const setCompanyId = (comIdVal: string) => {
    companyId.value = comIdVal
  }
  const setCompanyName = (companyNameVal: string) => {
    companyName.value = companyNameVal
  }
  const setUser = (userInfo: UserInfo) => {
    users.value.push(userInfo)
  }
  const setSettings = (settingInfo: SettingsResponse) => {
    settings.value = settingInfo
  }
  const companyLogin = async (loginId: string, password: string) => {
    const [data, status, error] = await requestCompanyLogin({
      "login_id": loginId,
      "password": password
    })
    const response: CompanyLoginResponse = data.value
    const errorResponse: ErrorResponse = error.value
    if (status.value == 'success') {
      setToken(response.token)
      setCompanyId(response.company_id)
      setCompanyName(response.company_name)
      if (response.active_users.length > 0) {
        response.active_users.forEach((user) => addActiveUser(user))
      }
      return response
    } else {
      throw new CustomError(errorResponse.data.message, { status: error.value.statusCode })
    }
  }
  
  const companyLogout = async () => {
    const [data, status, error] = await requestCompanyLogout()
    if (status.value === 'success') {
      emptyActiveUser()
      removeCurrentUser()
      return true
    } else {
      return false
    }
  }

  const companySetting = async () => {
    const [data, status, error] = await requestSettings()
    if (status.value === 'success') {
      setSettings(data.value)
    }
  }

  return {
    token,
    companyId,
    companyName,
    users,
    settings,
    setToken,
    setCompanyId,
    setCompanyName,
    companyLogin,
    setUser,
    companyLogout,
    companySetting,
  }
},
{
  persist: true
})
