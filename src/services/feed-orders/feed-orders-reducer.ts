import {WebsocketStatus} from "../../utils/config-ws";
import {
  FEED_ORDERS_WS_CONNECTING,
  FEED_ORDERS_WS_ERROR,
  FEED_ORDERS_WS_MESSAGE,
  FEED_ORDERS_WS_OPEN,
  FEED_ORDERS_WS_CLOSE
} from "./feed-orders-actions";


export type TFeedOrdersState = {
  status: WebsocketStatus.OFFLINE,
  data: null,
  connectingError: null,
}

const initialState = {
  status: WebsocketStatus.OFFLINE,
  data: null,
  connectingError: null,
}

//@ts-ignore
export const reducerFeedOrders = (state = initialState, action) => {
  switch (action.type) {
    case FEED_ORDERS_WS_CONNECTING:
      return{
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    case FEED_ORDERS_WS_OPEN:
      return{
        ...state,
        status: WebsocketStatus.ONLINE,
      };
    case FEED_ORDERS_WS_ERROR:
      return{
        ...state,
        connectingError: action.payload,
      };
    case FEED_ORDERS_WS_MESSAGE:
      return{
        ...state,
        data: action.payload,
      };
    case FEED_ORDERS_WS_CLOSE:
      return{
        ...initialState
      };
    default:
      return state;

  }
}