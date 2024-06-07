import { useApiFetch } from "./useApiFetch"

interface CreateCompanyUserRequest {
  name: string
  email: string
  tel: string
  login_id: string
  password: string
}

interface SettingsResponse {
  id: number
  company_id: number
  service_charge_type_id: number
  tax: number
  service_charge_amount: number
}

const requestCreateCompanyUser = async (body: CreateCompanyUserRequest) => {
  const { data, status, error } = await useApiFetch('v1/company_user/create_company_user', {
    method: 'POST',
    body: body
  }
  )
  return [data, status, error]
}

const requestSettings = async () => {
  const { data, status, error } = await useApiFetch('v1/company_user/settings', {
    method: 'GET'
  })
  return [data, status, error]
}

export {
  requestCreateCompanyUser,
  requestSettings
}

export type {
  CreateCompanyUserRequest,
  SettingsResponse,
}
