import { useApiFetch } from "./useApiFetch"

interface CompanyLoginRequest {
  login_id: string;
  password: string;
}

interface CompanyLoginResponse {
  company_id: string;
  company_name: string;
  token: string;
}

const requestCompanyLogin = async (body: CompanyLoginRequest) => {
  const { data, status, error } = await useApiFetch('v1/company_login', {
    method: 'POST',
    body: body
  })
  return [data, status, error]
}

export {
  requestCompanyLogin
};
export type {
  CompanyLoginResponse
};

