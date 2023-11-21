import {configureStore} from "@reduxjs/toolkit";
import {burgerConstructorReducer} from "./burger-constructor/burger-constructor-reducer";
import {orderDetailsReducer} from "./order-details/order-details-reducer";
import {burgerIngredientsReducer} from "./burger-ingredients/burger-ingredients-reducer";
import {inputsValuesReducer} from "./inputs-values/inputs-values-reducer";
import {userDataReducer} from "./user/user-reducer";
import {errorModalReducer} from "./error-modal/error-modal-reducer";
import {reducerFeedOrders} from "./feed-orders/feed-orders-reducer";
import {socketMiddleware} from "./middleware/socket-middleware";


import {
  FEED_ORDERS_CONNECT,
  FEED_ORDERS_DISCONNECT,
  FEED_ORDERS_WS_CLOSE,
  FEED_ORDERS_WS_CONNECTING,
  FEED_ORDERS_WS_ERROR,
  FEED_ORDERS_WS_MESSAGE,
  FEED_ORDERS_WS_OPEN
} from "./feed-orders/feed-orders-actions";

import {
  FEED_ORDERS_PROFILE_WS_MESSAGE,
  FEED_ORDERS_PROFILE_WS_OPEN,
  FEED_ORDERS_PROFILE_CONNECT,
  FEED_ORDERS_PROFILE_DISCONNECT,
  FEED_ORDERS_PROFILE_WS_CONNECTING,
  FEED_ORDERS_PROFILE_WS_ERROR,
  FEED_ORDERS_PROFILE_WS_CLOSE,
} from "./feed-orders-profile/feed-orders-actions";
import {reducerFeedOrdersProfile} from "./feed-orders-profile/feed-orders-reducer";


const feedOrdersMiddleware = socketMiddleware({
  wsConnect: FEED_ORDERS_CONNECT,
  onOpen: FEED_ORDERS_WS_OPEN,
  onClose: FEED_ORDERS_WS_CLOSE,
  onError: FEED_ORDERS_WS_ERROR,
  onMessage: FEED_ORDERS_WS_MESSAGE,
  wsConnecting: FEED_ORDERS_WS_CONNECTING,
  wsDisconnect: FEED_ORDERS_DISCONNECT,

})

const feedOrdersMiddlewareProfile = socketMiddleware({
  wsConnect: FEED_ORDERS_PROFILE_CONNECT,
  onOpen: FEED_ORDERS_PROFILE_WS_OPEN,
  onClose: FEED_ORDERS_PROFILE_WS_CLOSE,
  onError: FEED_ORDERS_PROFILE_WS_ERROR,
  onMessage: FEED_ORDERS_PROFILE_WS_MESSAGE,
  wsConnecting: FEED_ORDERS_PROFILE_WS_CONNECTING,
  wsDisconnect: FEED_ORDERS_PROFILE_DISCONNECT,

})

export const store = configureStore(({
  reducer: {
    chooseIngredients: burgerConstructorReducer,
    orderDetails: orderDetailsReducer,
    burgerIngredients: burgerIngredientsReducer,
    inputsValues: inputsValuesReducer,
    user: userDataReducer,
    errorModal: errorModalReducer,
    feedOrders: reducerFeedOrders,
    feedOrdersProfile: reducerFeedOrdersProfile,
  },
  middleware: (getDefaultMiddelware) => {
    return getDefaultMiddelware().concat(feedOrdersMiddleware, feedOrdersMiddlewareProfile)
  }
}));


/*  middleware: (getDefaultMiddelware) => {
    return getDefaultMiddelware({serializableCheck:false}).concat(feedOrdersMiddleware)
  }*/