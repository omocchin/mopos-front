import { requestClockInOut, type ClockInOutResponse, type ClockInOutRequest } from "#imports";
import { CustomError } from "~/utils/classes/customs"
import { type ErrorResponse } from "~/utils/interfaces/errors"

export const useUserStore = defineStore('user', () => {
  const activeUsers = ref<Array<ClockInOutResponse>>([])
  const currentUser = ref<number | null>(null)

  const addActiveUser = (user: ClockInOutResponse) => {
    activeUsers.value.push(user)
  } 
  
  const removeActiveUser = (user: ClockInOutResponse) => {
    const userIndex = activeUsers.value.findIndex(({user_number}) => user_number === user.user_number)
    activeUsers.value.splice(userIndex, 1)
  }

  const setCurrentUser = (userNumber: string | null) => {
    currentUser.value = userNumber ? Number(userNumber) : null
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

  return {activeUsers, currentUser, userClockInOut, setCurrentUser}
},
{
  persist: true
})