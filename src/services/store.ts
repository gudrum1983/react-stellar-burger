import {burgerConstructorReducer} from "./burger-constructor/burger-constructor-reducer";
import {orderDetailsReducer} from "./order-details/order-details-reducer";
import {burgerIngredientsReducer} from "./burger-ingredients/burger-ingredients-reducer";
import {userDataReducer} from "./user/user-reducer";
import {errorModalReducer} from "./error-modal/error-modal-reducer";
import {reducerFeedOrders} from "./feed-orders/feed-orders-reducer";
import {socketMiddleware} from "./middleware/socket-middleware";

import {configureStore, ThunkAction} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import {TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook,} from "react-redux";

import {
  FEED_ORDERS_CONNECT,
  FEED_ORDERS_DISCONNECT,
  FEED_ORDERS_WS_CLOSE,
  FEED_ORDERS_WS_CONNECTING,
  FEED_ORDERS_WS_ERROR,
  FEED_ORDERS_WS_MESSAGE,
  FEED_ORDERS_WS_OPEN,
  TFeedOrdersActions
} from "./feed-orders/feed-orders-actions";

import {
  FEED_ORDERS_PROFILE_CONNECT,
  FEED_ORDERS_PROFILE_DISCONNECT,
  FEED_ORDERS_PROFILE_WS_CLOSE,
  FEED_ORDERS_PROFILE_WS_CONNECTING,
  FEED_ORDERS_PROFILE_WS_ERROR,
  FEED_ORDERS_PROFILE_WS_MESSAGE,
  FEED_ORDERS_PROFILE_WS_OPEN, TProfileOrdersActions,
} from "./feed-orders-profile/feed-orders-actions";
import {reducerFeedOrdersProfile} from "./feed-orders-profile/feed-orders-reducer";
import {TUserActions} from "./user/user-action";
import {TErrorModalActions} from "./error-modal/error-modal-action";
import {TOrderDetailsActions} from "./order-details/order-details-actions";
import {TBurgerConstructorActions} from "./burger-constructor/burger-constructor-actions";
import {TIngredientsActions} from "./burger-ingredients/burger-ingredients-actions";


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

const reducer = combineReducers({
  chooseIngredients: burgerConstructorReducer,
  orderDetails: orderDetailsReducer,
  burgerIngredients: burgerIngredientsReducer,
  user: userDataReducer,
  errorModal: errorModalReducer,
  feedOrders: reducerFeedOrders,
  feedOrdersProfile: reducerFeedOrdersProfile,
});

export type TRootState = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({serializableCheck: false}).concat(feedOrdersMiddleware, feedOrdersMiddlewareProfile)
  }
});

type TAppActions = | TErrorModalActions
  | TOrderDetailsActions
  | TBurgerConstructorActions
  | TIngredientsActions
  | TFeedOrdersActions
  | TProfileOrdersActions
  | TUserActions;



//todo почему export type ThunkAction<
//   ReturnType,
//   State,
//   ExtraThunkArg, ---unknown??????
//   BasicAction extends Action
// >
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, unknown, TAppActions>;

/*export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, Action, TRootState, TAppActions>;*/


export type AppDispatch<TReturnType = void> = (action: TAppActions | AppThunk<TReturnType>) => TReturnType;

export const useDispatch2: () => AppDispatch = dispatchHook;

export const useSelector2: TypedUseSelectorHook<TRootState> = selectorHook;
