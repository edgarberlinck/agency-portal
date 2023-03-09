import { ServerConfig } from "../types/server"
import { ONE_MINUTE } from "./time"

export const GeneralServerConfig: ServerConfig = {
  revalidationTime: ONE_MINUTE
}