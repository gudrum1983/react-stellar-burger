import styles from "./order-details.module.css";

function OrderDetails(){

  return (
    <div className={`${styles.modalContainer} pt-4 pb-20`}>
      <p className={`text text_type_digits-large mb-8 ${styles.blue}`}>034536</p>
      <p className="text text_type_main-medium mb-15">Идентификатор заказа</p>
      <div className={`${styles.iconDone} mb-15`}></div>
      <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )

}

export {
  OrderDetails
}