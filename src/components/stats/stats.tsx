import React from "react";
import styles from "./stats.module.css"
import {CountCompleted} from "./count-completed/count-completed";
import {OrdersBoard} from "./orders-board/orders-board";
import {
   selectorFeedOrdersDoneOrdersNumber, selectorFeedOrdersProgressOrdersNumber,
  selectorFeedOrdersTotal, selectorFeedOrdersTotalToday
} from "../../services/feed-orders/feed-orders-selector";
import {useSelector2} from "../../services/store";

export function Stats():JSX.Element {

  const total = useSelector2(selectorFeedOrdersTotal) ?? 0
  const totalToday = useSelector2(selectorFeedOrdersTotalToday) ?? 0

  const ordersListDone = useSelector2(selectorFeedOrdersDoneOrdersNumber)  ?? []
  const ordersListProgress = useSelector2(selectorFeedOrdersProgressOrdersNumber) ?? []

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