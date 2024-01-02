import { useApiFetch } from "./useApiFetch"

const requestCompanyLogin = async (body: any) => {
  console.log('body', body)
  const { data, status } = await useApiFetch('v1/company_login', {
    method: 'POST',
    body: body
  })
  if (status.value == 'success') {
    return data
  } else {
    return false
  }
}

export {
  requestCompanyLogin
}
