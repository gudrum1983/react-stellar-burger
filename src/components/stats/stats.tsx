import React from "react";
import styles from "./stats.module.css"
import {useSelector} from "react-redux";
import {CountCompleted} from "./count-completed/count-completed";
import {OrdersBoard} from "./orders-board/orders-board";
import {
   selectorFeedOrdersDoneOrdersNumber, selectorFeedOrdersProgressOrdersNumber,
  selectorFeedOrdersTotal, selectorFeedOrdersTotalToday
} from "../../services/feed-orders/selector-feed-orders";

export function Stats():JSX.Element {

  const total: number = useSelector(selectorFeedOrdersTotal)
  const totalToday: number = useSelector(selectorFeedOrdersTotalToday)

  const ordersListDone: Array<string> = useSelector(selectorFeedOrdersDoneOrdersNumber)
  const ordersListProgress: Array<string> = useSelector(selectorFeedOrdersProgressOrdersNumber)

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