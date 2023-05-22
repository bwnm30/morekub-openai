import { Client } from "@line/bot-sdk"
import customConfig from "../config/default";
  
export const lineConfig = {
    channelAccessToken:customConfig.channelAccessToken,
    channelSecret:customConfig.channelSecret,
}

export const client = new Client(lineConfig)