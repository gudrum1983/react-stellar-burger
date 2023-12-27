import { getUser} from "../user/user-action";
import {Middleware, MiddlewareAPI} from "redux";
import {
  FEED_ORDERS_CONNECT,
  FEED_ORDERS_DISCONNECT,
  FEED_ORDERS_WS_CLOSE,
  FEED_ORDERS_WS_CONNECTING,
  FEED_ORDERS_WS_ERROR,
  FEED_ORDERS_WS_MESSAGE,
  FEED_ORDERS_WS_OPEN} from "../feed-orders/feed-orders-actions";
import {
  FEED_ORDERS_PROFILE_CONNECT,
  FEED_ORDERS_PROFILE_DISCONNECT,
  FEED_ORDERS_PROFILE_WS_CLOSE,
  FEED_ORDERS_PROFILE_WS_CONNECTING,
  FEED_ORDERS_PROFILE_WS_ERROR,
  FEED_ORDERS_PROFILE_WS_MESSAGE,
  FEED_ORDERS_PROFILE_WS_OPEN
} from "../feed-orders-profile/feed-orders-actions";
import {TRootState} from "../store";
import type {} from "redux-thunk/extend-redux";
import {connectProfile} from "../../utils/config-ws";


type TwsActions = {
  wsConnect: string |typeof FEED_ORDERS_CONNECT| typeof FEED_ORDERS_PROFILE_CONNECT,
  wsSendMessage?: string,
  onOpen: string |typeof FEED_ORDERS_WS_OPEN| typeof FEED_ORDERS_PROFILE_WS_OPEN,
  onClose: string |typeof FEED_ORDERS_WS_CLOSE| typeof FEED_ORDERS_PROFILE_WS_CLOSE,
  onError: string |typeof FEED_ORDERS_WS_ERROR| typeof FEED_ORDERS_PROFILE_WS_ERROR,
  onMessage: string |typeof FEED_ORDERS_WS_MESSAGE| typeof FEED_ORDERS_PROFILE_WS_MESSAGE,
  wsConnecting: string |typeof FEED_ORDERS_WS_CONNECTING| typeof FEED_ORDERS_PROFILE_WS_CONNECTING,
  wsDisconnect: string |typeof FEED_ORDERS_DISCONNECT| typeof FEED_ORDERS_PROFILE_DISCONNECT,
}

export const socketMiddleware = (wsActions:TwsActions):Middleware<{},TRootState> => {
  return (store:MiddlewareAPI) => {
    let socket : WebSocket | null = null;
    let isDisconnect = false

    return next => action => {
      const {dispatch} = store;
      const {type} = action;
      const {
        wsConnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;

      if (type === wsConnect) {
        socket = new WebSocket(action.payload);
        dispatch({type: wsConnecting})
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({type: onOpen});
        };

        socket.onerror = () => {
          dispatch({type: onError, payload: "Error"});
        };

        socket.onmessage = async event => {

          const {data} = event;
          const parsedData = JSON.parse(data);
          if (parsedData.message === "Invalid or missing token") {

            await dispatch(getUser());

            const token = localStorage.getItem("accessToken")?.slice(7) ?? ""
            dispatch(connectProfile(token))
          } else {
            dispatch({type: onMessage, payload: parsedData});
          }
        };

        socket.close = () => {
          if (isDisconnect){
            dispatch({type: onClose});
          } else {
            socket = new WebSocket(action.payload);
            dispatch({type: wsConnecting})
          }
        };

        if (wsSendMessage && type === wsSendMessage) {
          socket.send(JSON.stringify(action.payload))
        }

        if (type === wsDisconnect) {
          isDisconnect = true
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};