import {TRootState} from "../store";

export const selectorFeedOrdersStatus = (store:TRootState) => store.feedOrders.status

export const selectorFeedOrdersData = (store:TRootState) => store.feedOrders.data
export const selectorFeedOrdersDataOrders = (store:TRootState) => store.feedOrders.data?.orders

export const selectorFeedOrdersTotal = (store:TRootState) => store.feedOrders.data?.total
export const selectorFeedOrdersTotalToday = (store:TRootState) => store.feedOrders.data?.totalToday

export const selectorFeedOrdersDoneOrdersNumber = (store:TRootState) => store.feedOrders?.data?.orders.filter(item => item.status === "done").map(item => item.number)

export const selectorFeedOrdersProgressOrdersNumber = (store:TRootState) => store.feedOrders?.data?.orders.filter(item => item.status !== "done").map(item => item.number)

