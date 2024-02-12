interface ErrorResponse {
  statusCode: number;
  data: {
    error: string
    message: string
    model?: string
  }
}

export type {
  ErrorResponse
}
