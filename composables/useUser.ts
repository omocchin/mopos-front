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

interface UsersRequest {
  page: number
  per_page: number
  keyword?: string
  user_status?: string
}

interface Users {
  id: number
  first_name: string
  last_name: string
  user_number: number
  authority: string
  pay: number
}

interface UsersResponse {
  current_page: number
  total_pages: number
  users: Users
}

interface CreateUserRequest {
  first_name: string
  last_name: string
  tel?: string
  email?: string
  authority: number
  pay: number
  user_number?: number
  login_id: string
  password?: string
  password_confirmation?: string
}

interface GetUserResponse {
  first_name: string
  last_name: string
  tel: string
  email: string
  pay: number
  user_number: number
  login_id: string
  user_authority_id: number
  status: string
}

interface DeleteUsersRequest {
  ids: Array<number>
}

const requestClockInOut = async (body: ClockInOutRequest) => {
  const { data, status, error } = await useApiFetch('v1/user/clock_in_out', {
    method: 'POST',
    body: body
  })
  return [data, status, error]
}

const requestUserLogin = async (body: UserLoginRequest) => {
  const { data, status, error } = await useApiFetch('v1/user_login', {
    method: 'POST',
    body: body
  })
  return [data, status, error]
}

const requestUsers = async (page: number, perPage: number, keyword?: string, userStatus?: string) => {
  const query: UsersRequest = {
    page: page,
    per_page: perPage,
    keyword: keyword,
    user_status: userStatus
  }
  const { data, status, error } = await useApiFetch('v1/users', {
    method: 'GET',
    query: query
  })
  return data
}

const requestCreateUser = async (body: CreateUserRequest) => {
  const { data, status, error } = await useApiFetch('v1/user/create', {
    method: 'POST',
    body: body
  })
  return [data, status, error]
}

const requestGetUser = async (userId: any) => {
  const { data, status, error } = await useApiFetch(`v1/user/${userId}`, {
    method: 'GET'
  })
  return [data, status, error]
}

const requestEditUser = async (userId: any, body: CreateUserRequest) => {
  const { data, status, error } = await useApiFetch(`v1/user/${userId}`, {
    method: 'PUT',
    body: body
  })
  return [data, status, error]
}

const requestDeleteUsers = async (body: DeleteUsersRequest) => {
  const { data, status, error } = await useApiFetch('v1/users', {
    method: 'DELETE',
    body: body
  })
  return [data, status, error]
}

export {
  requestClockInOut,
  requestUserLogin,
  requestUsers,
  requestCreateUser,
  requestGetUser,
  requestEditUser,
  requestDeleteUsers,
}

export type {
  ClockInOutResponse,
  ClockInOutRequest,
  UserLoginRequest,
  UserLoginResponse,
  UsersResponse,
  UsersRequest,
  Users,
  CreateUserRequest,
  GetUserResponse,
}
