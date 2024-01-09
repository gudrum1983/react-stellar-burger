import {TUrl} from "../../utils/types";
import {TFeedOrdersMessage} from "./feed-orders-reducer";

export const FEED_ORDERS_CONNECT = "FEED_ORDERS_CONNECT"
export const FEED_ORDERS_DISCONNECT = "FEED_ORDERS_DISCONNECT"
export const FEED_ORDERS_WS_CONNECTING = "FEED_ORDERS_WS_CONNECTING"
export const FEED_ORDERS_WS_OPEN = "FEED_ORDERS_WS_OPEN"
export const FEED_ORDERS_WS_CLOSE = "FEED_ORDERS_WS_CLOSE"
export const FEED_ORDERS_WS_MESSAGE = "FEED_ORDERS_WS_MESSAGE"
export const FEED_ORDERS_WS_ERROR = "FEED_ORDERS_WS_ERROR"

type TWSConnectingFeedOrders = {
  type: typeof FEED_ORDERS_WS_CONNECTING,
}

type TWSOnOpenFeedOrders = {
  type: typeof FEED_ORDERS_WS_OPEN,
}

type TWSOnErrorFeedOrders = {
  type: typeof FEED_ORDERS_WS_ERROR,
  payload: string,
}

type TWSMessageFeedOrders = {
  type: typeof FEED_ORDERS_WS_MESSAGE,
  payload: TFeedOrdersMessage
}

type TWSCloseFeedOrders = {
  type: typeof FEED_ORDERS_WS_CLOSE,
}



type TConnectFeedOrders = {
  type: typeof FEED_ORDERS_CONNECT,
  payload: TUrl,
}

type TDisconnectFeedOrders = {
  type: typeof FEED_ORDERS_DISCONNECT,
}

export type TFeedOrdersActions =  TWSConnectingFeedOrders
  | TWSOnOpenFeedOrders
  | TWSOnErrorFeedOrders
  | TWSMessageFeedOrders
  | TWSCloseFeedOrders
  | TConnectFeedOrders
  | TDisconnectFeedOrders


export const connectFeedOrders = (url:TUrl):TConnectFeedOrders => ({
  type: FEED_ORDERS_CONNECT,
  payload: url,
})

export const disconnectFeedOrders = ():TDisconnectFeedOrders => ({
  type: FEED_ORDERS_DISCONNECT,
})
