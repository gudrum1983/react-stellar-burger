import styles from "./order-details.module.css";
import React from "react";
import {useSelector} from "react-redux";
import {orderDetails} from "../../../services/order-details/order-details-selectors";

export function OrderDetails() {

  const {orderNumber} = useSelector(orderDetails)

  return (
    <div className={`${styles.modalContainer} pt-4 pb-20`}>
      <p className={`text text_type_digits-large mb-8 ${styles.blue}`}>{orderNumber}</p>
      <p className="text text_type_main-medium mb-15">Идентификатор заказа</p>
      <div className={`${styles.iconDone} mb-15`}></div>
      <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}