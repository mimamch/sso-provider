import { ZodError } from "zod"

export default class ValidationError extends Error {
  constructor(message: string, code?: number) {
    super(message)
    this.code = code
  }
  code
}

interface ParsedError {
  message: string
  code?: number
}
export const parseError = (error: any): ParsedError => {
  // if (error instanceof AxiosError) {
  //   return {
  //     message:
  //       error.response?.data.message ?? "Something went wrong on the server...",
  //   }
  // }
  if (error instanceof ZodError) {
    return {
      message: error.errors[0].message,
    }
  }
  if (error instanceof ValidationError) {
    return {
      message: error.message,
    }
  }
  if (error instanceof Error) {
    return {
      message: error.message ?? "Something was wrong...",
    }
  }

  return {
    message: "Upsss... Unknown Error",
  }
}
