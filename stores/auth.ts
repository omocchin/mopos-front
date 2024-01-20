import { requestCompanyLogin, type CompanyLoginResponse } from "#imports"
import { CustomError } from "~/utils/classes/customs"
import { type ErrorResponse } from "~/utils/interfaces/errors"

interface UserInfo {
  name: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>('')
  const companyId = ref<string>('')
  const companyName = ref<string>('')
  const users = ref<Array<UserInfo>>([])

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
      return response
    } else {
      throw new CustomError(errorResponse.data.message, { status: error.value.statusCode })
    }
  }

  return { token, companyId, companyName, users, setToken, setCompanyId, setCompanyName, companyLogin, setUser }
},
{
  persist: true
})
