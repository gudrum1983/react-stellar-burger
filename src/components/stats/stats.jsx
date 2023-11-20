import React from "react";
import styles from "./stats.module.css"
import {countOrders, ordersListAllready, ordersListProgress} from "../../utils/data";

export function Stats() {


  return (
    <div className={styles.stats}>
      <div className={styles.ordersBoard}>
        <ListOrdersBoard header="Готовы:" items={ordersListAllready} done={true}/>
        <ListOrdersBoard header="В работе:" items={ordersListProgress}/>

      </div>

      <Completed header={"Выполнено за все время:"}>
        {countOrders.all}
      </Completed>
      <Completed header={"Выполнено за сегодня:"}>
        {countOrders.today}
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
        {items.map((item) => (
          <p className={`text text_type_digits-default ${styleText}`} >{item}</p>
        ))}

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


console.log("partNumber.millions", partNumber.millions)
  console.log("partNumber.thousands", partNumber.thousands)
  console.log("partNumber.hundreds", partNumber.hundreds)
/*  const stringCount = String(children)



  if (stringCount.length > 6) {

  }*/



  return (
    <div>
      <p className="text text_type_main-medium">{header}</p>
      <p className={`${styles.shadow} text text_type_digits-large`}>{partNumber.millions}{partNumber.thousands}{partNumber.hundreds}</p>
    </div>


  )
}