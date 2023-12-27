import React from "react";
import styles from "./stats.module.css"
import {CountCompleted} from "./count-completed/count-completed";
import {OrdersBoard} from "./orders-board/orders-board";
import {
   selectorFeedOrdersDoneOrdersNumber, selectorFeedOrdersProgressOrdersNumber,
  selectorFeedOrdersTotal, selectorFeedOrdersTotalToday
} from "../../services/feed-orders/feed-orders-selector";
import {useSelectorApp} from "../../services/store";

export function Stats():JSX.Element {

  const total = useSelectorApp(selectorFeedOrdersTotal) ?? 0
  const totalToday = useSelectorApp(selectorFeedOrdersTotalToday) ?? 0

  const ordersListDone = useSelectorApp(selectorFeedOrdersDoneOrdersNumber)  ?? []
  const ordersListProgress = useSelectorApp(selectorFeedOrdersProgressOrdersNumber) ?? []

  return (
    <div className={styles.stats}>
      <div className={styles.ordersBoard}>
        <OrdersBoard header="Готовы:" items={ordersListDone} done={true}/>
        <OrdersBoard header="В работе:" items={ordersListProgress}/>
      </div>
      <CountCompleted header={"Выполнено за все время:"} value={total}/>
      <CountCompleted header={"Выполнено за сегодня:"} value={totalToday}/>
    </div>
  )
}