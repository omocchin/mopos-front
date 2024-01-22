import { useApiFetch } from "./useApiFetch"

interface CreateCompanyUserRequest {
  name: string
  email: string
  tel: string
  login_id: string
  password: string
}

const requestCreateCompanyUser = async (body: CreateCompanyUserRequest) => {
  const { data, status, error } = await useApiFetch('v1/company_user/create_company', {
    method: 'POST',
    body: body
  }
  )
  return [data, status, error]
}

export {
  requestCreateCompanyUser
}

export type {
  CreateCompanyUserRequest,
}
