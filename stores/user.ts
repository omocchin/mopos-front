import {
  requestClockInOut,
  requestUserLogin,
  requestUserLogout,
  type ClockInOutResponse,
  type ClockInOutRequest,
  type UserLoginRequest,
  type UserLoginResponse
} from "#imports";
import { CustomError } from "~/utils/classes/customs"
import { type ErrorResponse } from "~/utils/interfaces/errors"

export const useUserStore = defineStore('user', () => {
  const activeUsers = ref<Array<ClockInOutResponse>>([])
  const currentUser = ref<number | null>(null)
  const userToken = ref<string | null>(null)
  const userName = ref<string>('')
  const userAuthority = ref<number | null>(null)

  const addActiveUser = (user: ClockInOutResponse) => {
    activeUsers.value.push(user)
  }

  const emptyActiveUser = () => {
    activeUsers.value = []
  } 

  const setUserToken = (token: string) => {
    userToken.value = token
  }

  const setUserName = (name: string) => {
    userName.value = name
  }

  const setUserAuthority = (authority: number | null) => {
    userAuthority.value = authority
  }
  
  const removeActiveUser = (user: ClockInOutResponse) => {
    const userIndex = activeUsers.value.findIndex(({user_number}) => user_number === user.user_number)
    activeUsers.value.splice(userIndex, 1)
  }

  const setCurrentUser = (userNumber: string | null) => {
    currentUser.value = userNumber ? Number(userNumber) : null
  }

  const removeCurrentUser = () => {
    currentUser.value = null
  }

  const userClockInOut = async (body: ClockInOutRequest) => {
    const [data, status, error] = await requestClockInOut(body)
    const response: ClockInOutResponse = data.value
    const errorResponse: ErrorResponse = error.value
    if (status.value == 'success') {
      if (response.status == 'clocked_in') {
        addActiveUser(response)
      } else {
        removeActiveUser(response)
      }
      return response
    } else {
      throw new CustomError(errorResponse.data.message, { status: error.value.statusCode })
    }
  }

  const userLogin = async (body: UserLoginRequest) => {
    const [data, status, error] = await requestUserLogin(body)
    const response: UserLoginResponse = data.value
    const errorResponse: ErrorResponse = error.value
    if (status.value === 'success') {
      if (response.authority != 4) {
        setUserToken(response.token)
        setUserName(response.name)
        setUserAuthority(response.authority)
        return response
      } else {
        throw new CustomError('User does not have authority to access.', { status: 402 })
      }
    } else {
      throw new CustomError(errorResponse.data.message, { status: error.value.statusCode })
    }
  }

  const userLogout = async () => {
    const [data, status, error] = await requestUserLogout()
    if (status.value === 'success') {
      setUserToken('')
      setUserName('')
      setUserAuthority(null)
      return true
    } else {
      return false
    }
  }

  return {
    addActiveUser,
    activeUsers,
    userToken,
    userName,
    userAuthority,
    currentUser,
    userClockInOut,
    setCurrentUser,
    emptyActiveUser,
    removeCurrentUser,
    userLogin,
    userLogout
  }
},
{
  persist: true
})