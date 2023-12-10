import {getUser} from "../user/user-action";

export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;
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

        socket.onmessage = event => {
          const {data} = event;
          const parsedData = JSON.parse(data);
          if (parsedData?.message === "Invalid or missing token") {
            console.log("получена ошибка", parsedData)
            dispatch(getUser())
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