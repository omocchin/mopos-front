import { useApiFetch } from "./useApiFetch"
import { type ClockInOutResponse } from "./useUser";

interface CompanyLoginRequest {
  login_id: string;
  password: string;
}

interface CompanyLoginResponse {
  company_id: string;
  company_name: string;
  token: string;
  active_users: Array<ClockInOutResponse>
}

const requestCompanyLogin = async (body: CompanyLoginRequest) => {
  const { data, status, error } = await useApiFetch('v1/company_login', {
    method: 'POST',
    body: body
  })
  return [data, status, error]
}

const requestCompanyLogout = async () => {
  const { data, status, error } = await useApiFetch('v1/company_logout', {
    method: 'POST',
  })
  return [data, status, error]
}

export {
  requestCompanyLogin,
  requestCompanyLogout
};
export type {
  CompanyLoginResponse
};

