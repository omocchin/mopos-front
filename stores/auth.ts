import { requestCompanyLogin, type CompanyLoginResponse } from "#imports"
import { CustomError } from "~/common/classes/customs"
import { type ErrorResponse } from "~/common/interfaces/errors"

export const useAuthStore = defineStore('counter', () => {
  const token = ref('')
  const companyId = ref('')
  const companyName = ref('')

  const setToken = (tokenVal: string) => {
    token.value = tokenVal
  }
  const setCompanyId = (comIdVal: string) => {
    companyId.value = comIdVal
  }
  const setCompanyName = (companyNameVal: string) => {
    companyName.value = companyNameVal
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

  return { token, companyId, companyName, setToken, setCompanyId, setCompanyName, companyLogin }
})
