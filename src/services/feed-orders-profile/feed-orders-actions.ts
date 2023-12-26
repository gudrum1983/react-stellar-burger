import {TFeedOrdersMessage} from "../feed-orders/feed-orders-reducer";
import {TUrl} from "../../utils/types";

export const FEED_ORDERS_PROFILE_CONNECT = "FEED_ORDERS_PROFILE_CONNECT"
export const FEED_ORDERS_PROFILE_DISCONNECT = "FEED_ORDERS_PROFILE_DISCONNECT"
export const FEED_ORDERS_PROFILE_WS_CONNECTING = "FEED_ORDERS_WS_PROFILE_CONNECTING"
export const FEED_ORDERS_PROFILE_WS_OPEN = "FEED_ORDERS_PROFILE_WS_OPEN"
export const FEED_ORDERS_PROFILE_WS_CLOSE = "FEED_ORDERS_PROFILE_WS_CLOSE"
export const FEED_ORDERS_PROFILE_WS_MESSAGE = "FEED_ORDERS_PROFILE_WS_MESSAGE"
export const FEED_ORDERS_PROFILE_WS_ERROR = "FEED_ORDERS_PROFILE_WS_ERROR"

type TWSConnectingProfileOrders = {
  type: typeof FEED_ORDERS_PROFILE_WS_CONNECTING,
}

type TWSOnOpenProfileOrders = {
  type: typeof FEED_ORDERS_PROFILE_WS_OPEN,
}

type TWSOnErrorProfileOrders = {
  type: typeof FEED_ORDERS_PROFILE_WS_ERROR,
  payload: string,
}

type TWSMessageProfileOrders = {
  type: typeof FEED_ORDERS_PROFILE_WS_MESSAGE,
  payload: TFeedOrdersMessage
}

type TWSCloseProfileOrders = {
  type: typeof FEED_ORDERS_PROFILE_WS_CLOSE,
}



type TConnectProfileOrders = {
  type: typeof FEED_ORDERS_PROFILE_CONNECT,
  payload: TUrl,
}

type TDisconnectProfileOrders = {
  type: typeof FEED_ORDERS_PROFILE_DISCONNECT,
}

export type TProfileOrdersActions = TWSConnectingProfileOrders
| TWSOnOpenProfileOrders
| TWSOnErrorProfileOrders
| TWSMessageProfileOrders
| TWSCloseProfileOrders
| TConnectProfileOrders
| TDisconnectProfileOrders
export const connectFeedOrdersProfile = (url:TUrl):TConnectProfileOrders => ({
  type: FEED_ORDERS_PROFILE_CONNECT,
  payload: url,
})

export const disconnectFeedOrdersProfile = ():TDisconnectProfileOrders => ({
  type: FEED_ORDERS_PROFILE_DISCONNECT,
})


