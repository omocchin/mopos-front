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

const requestClockInOut = async (body: ClockInOutRequest) => {
  const { data, status, error } = await useApiFetch('v1//user/clock_in_out', {
    method: 'POST',
    body: body
  }
  )
  return [data, status, error]
}

export {
  requestClockInOut
}

export type {
  ClockInOutResponse,
  ClockInOutRequest
}
