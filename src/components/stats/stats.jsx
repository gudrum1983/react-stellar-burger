import React from "react";
import styles from "./stats.module.css"
import {useSelector} from "react-redux";
import {WebsocketStatus} from "../../utils/constants";
import {CountCompleted} from "./count-completed/count-completed";
import {OrdersBoard} from "./orders-board/orders-board";
import {selectorFeedOrdersData, selectorFeedOrdersStatus} from "../../services/feed-orders/selector-feed-orders";

export function Stats() {

  const status = useSelector(selectorFeedOrdersStatus)
  const data = useSelector(selectorFeedOrdersData)

  const isDisconnected = status !== WebsocketStatus.ONLINE
  const ordersListAllready = (data?.orders) ? data.orders.filter(item => item.status === "done").map(item => item.number) : [0]
  const ordersListProgress = (data?.orders) ? data.orders.filter(item => item.status !== "done").map(item => item.number) : [0]

  return (
    <div className={styles.stats}>
      <div className={styles.ordersBoard}>
        <OrdersBoard header="Готовы:" items={ordersListAllready} done={true} isDisconnected={isDisconnected}/>
        <OrdersBoard header="В работе:" items={ordersListProgress} isDisconnected={isDisconnected}/>
      </div>
      <CountCompleted header={"Выполнено за все время:"}>
        {data?.total}
      </CountCompleted>
      <CountCompleted header={"Выполнено за сегодня:"}>
        {data?.totalToday}
      </CountCompleted>
    </div>
  )
}