import {TRootState} from "../store";

export const orderDetailsRequest = (store:TRootState) => store.orderDetails.orderRequest
export const orderDetailsFailed = (store:TRootState) => store.orderDetails.orderFailed
export const orderDetails = (store:TRootState) => store.orderDetails
export const orderDetailsInfo = (store:TRootState) => store.orderDetails.order
export const orderDetailsNumber = (store:TRootState) => store.orderDetails.order?.number

