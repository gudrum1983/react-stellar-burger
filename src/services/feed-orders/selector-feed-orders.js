
export const selectorFeedOrdersStatus = store => store.feedOrders.status

export const selectorFeedOrdersData = store => store.feedOrders.data
export const selectorFeedOrdersDataOrders = store => store.feedOrders.data?.orders

export const selectorFeedOrdersTotal = store => store.feedOrders.data?.total
export const selectorFeedOrdersTotalToday = store => store.feedOrders.data?.totalToday

export const selectorFeedOrdersDoneOrdersNumber = store => store.feedOrders.data.orders.filter(item => item.status === "done").map(item => item.number)

export const selectorFeedOrdersProgressOrdersNumber = store => store.feedOrders.data.orders.filter(item => item.status !== "done").map(item => item.number)

