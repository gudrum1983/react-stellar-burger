import {
  connectFeedOrdersProfile,
  disconnectFeedOrdersProfile
} from "../services/feed-orders-profile/feed-orders-actions";
import {connectFeedOrders, disconnectFeedOrders} from "../services/feed-orders/feed-orders-actions";

export const WebsocketStatus = {
  CONNECTING: 'CONNECTING...',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
}
export const URL_WS_ALL = "wss://norma.nomoreparties.space/orders/all"
export const URL_WS_OWNER = "wss://norma.nomoreparties.space/orders?token="
export const connectFeed = () => connectFeedOrders(URL_WS_ALL)
export const connectProfile = (token) => connectFeedOrdersProfile(`${URL_WS_OWNER}${token}`)
export const disconnectFeed = () => disconnectFeedOrders()
export const disconnectProfile = () => disconnectFeedOrdersProfile()