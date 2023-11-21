import React from "react";
import styles from "./stats.module.css"
import {useSelector} from "react-redux";
import {WebsocketStatus} from "../../utils/constants";

export function Stats() {
  const {status, data} = useSelector(store => store.feedOrders)
  const isDisconnected = status !== WebsocketStatus.ONLINE
  const ordersListAllready = (data?.orders) ? data.orders.filter(item => item.status === "done").map(item => item.number) : [0]
  const ordersListProgress = (data?.orders) ? data.orders.filter(item => item.status !== "done").map(item => item.number) : [0]



  return (
    <div className={styles.stats}>
      <div className={styles.ordersBoard}>
        <ListOrdersBoard header="Готовы:" items={ordersListAllready} done={true} isDisconnected={isDisconnected}/>
        <ListOrdersBoard header="В работе:" items={ordersListProgress} isDisconnected={isDisconnected}/>

      </div>

      <Completed header={"Выполнено за все время:"}>
        {(!isDisconnected && data?.total) ? `${data?.total}` : 0}
      </Completed>
      <Completed header={"Выполнено за сегодня:"}>
        {(!isDisconnected && data?.totalToday) ? `${data?.totalToday}` : 0}
      </Completed>


    </div>


  )
}


export function ListOrdersBoard({header, items, done= false}) {

  const styleGrid = (items.length > 10) ? styles.listNumbersTwoColums : styles.listNumbers

  const styleText = done ? 'text_color_success' : ''

  return (
    <div className={styles.listOrdersBoard}>
      <p className="text text_type_main-medium">{header}
      </p>
      <div className={styleGrid}>
        {items.map((item, index) => {if (index < 20) {
          return (<p className={`text text_type_digits-default ${styleText}`} >{item}</p>)
      } })}

      </div>
    </div>


  )
}

export function Completed ({header, children}) {

  const partNumber = {
    millions: (Math.floor(children/1000000) === 0) ? "" : `${Math.floor(children/1000000)} `,
    thousands: (Math.floor(children/1000) === 0) ? "" : `${Math.floor(children/1000)} `,
    hundreds: children%1000,
  }

  return (
    <div>
      <p className="text text_type_main-medium">{header}</p>
      <p className={`${styles.shadow} text text_type_digits-large`}>{partNumber.millions}{partNumber.thousands}{partNumber.hundreds}</p>
    </div>


  )
}