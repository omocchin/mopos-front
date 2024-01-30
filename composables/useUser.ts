import { useApiFetch } from "./useApiFetch"

interface ClockInOutRequest {
  user_number: number
}

interface ClockInOutResponse {
  user_number: number
  first_name: string
  last_name: string
  status: string
  time: string
}

interface UserLoginRequest {
  user_number: string
  password: string
}

interface UserLoginResponse {
  user_name: string
  token: string
  authority: number
}

const requestClockInOut = async (body: ClockInOutRequest) => {
  const { data, status, error } = await useApiFetch('v1/user/clock_in_out', {
    method: 'POST',
    body: body
  }
  )
  return [data, status, error]
}

const requestUserLogin = async (body: UserLoginRequest) => {
  const { data, status, error } = await useApiFetch('v1/user_login', {
    method: 'POST',
    body: body
  }
  )
  return [data, status, error]
}

export {
  requestClockInOut,
  requestUserLogin
}

export type {
  ClockInOutResponse,
  ClockInOutRequest,
  UserLoginRequest,
  UserLoginResponse
}
