import { requestCompanyLogin, type CompanyLoginResponse } from "#imports"

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
    if (status.value == 'success') {
      setToken(response.token)
      setCompanyId(response.company_id)
      setCompanyName(response.company_name)
      return [true, response]
    } else {
      return [false, error]
    }
  }

  return { token, companyId, companyName, setToken, setCompanyId, setCompanyName, companyLogin }
})
