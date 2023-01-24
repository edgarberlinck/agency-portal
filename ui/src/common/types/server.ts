export type ResourceConfiguration = {
  populate: boolean
}

export type RequestError = {
  status: number
  message: string
}

export interface ServerProps {
  error?: RequestError
}