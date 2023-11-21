export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

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
        socket = new WebSocket(action.payload); // Ваш код здесь
        dispatch({type: wsConnecting})
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({type: onOpen});
        };

        socket.onerror = event => {
          dispatch({type: onError, payload: "Error"});
        };

        socket.onmessage = event => {
          const {data} = event;
          const parsedData = JSON.parse(data);
          dispatch({type: onMessage, payload: parsedData});
        };

        socket.onclose = event => {
          dispatch({type: onClose});
        };

        if (wsSendMessage && type === wsSendMessage) {
          socket.send(JSON.stringify(action.payload))
        }

        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};