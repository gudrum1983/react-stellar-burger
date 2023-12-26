import {TRootState} from "../store";

export const selectorProfileOrders = (store:TRootState) => store.feedOrdersProfile

export const selectorProfileOrdersStatus = (store:TRootState) => store.feedOrdersProfile.status

export const selectorProfileOrdersData = (store:TRootState) => store.feedOrdersProfile.data
export const selectorProfileOrdersDataOrders = (store:TRootState) => store.feedOrdersProfile.data?.orders