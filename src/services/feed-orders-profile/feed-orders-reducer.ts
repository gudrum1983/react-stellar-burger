import {WebsocketStatus} from "../../utils/config-ws";
import {
  FEED_ORDERS_PROFILE_WS_CONNECTING,
  FEED_ORDERS_PROFILE_WS_ERROR,
  FEED_ORDERS_PROFILE_WS_MESSAGE,
  FEED_ORDERS_PROFILE_WS_OPEN,
  FEED_ORDERS_PROFILE_WS_CLOSE, TProfileOrdersActions
} from "./feed-orders-actions";
import {TFeedOrdersState} from "../feed-orders/feed-orders-reducer";

const initialState:TFeedOrdersState = {
  status: WebsocketStatus.OFFLINE,
  data: null,
  connectingError: null,
}

export const reducerFeedOrdersProfile = (state = initialState, action:TProfileOrdersActions):TFeedOrdersState => {
  switch (action.type) {
    case FEED_ORDERS_PROFILE_WS_CONNECTING:
      return{
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    case FEED_ORDERS_PROFILE_WS_OPEN:
      return{
        ...state,
        status: WebsocketStatus.ONLINE,
      };
    case FEED_ORDERS_PROFILE_WS_ERROR:
      return{
        ...state,
        connectingError: action.payload,
      };
    case FEED_ORDERS_PROFILE_WS_MESSAGE:
      return{
        ...state,
        data: action.payload,
      };
    case FEED_ORDERS_PROFILE_WS_CLOSE:
      return{
        ...initialState
      };
    default:
      return state;

  }
}