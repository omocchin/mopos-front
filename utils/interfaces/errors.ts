interface ErrorResponse {
  statusCode: number;
  data: {
    error: string
    message: string
  }
}

export type {
  ErrorResponse
}
