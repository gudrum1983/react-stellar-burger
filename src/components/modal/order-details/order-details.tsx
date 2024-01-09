import styles from "./order-details.module.css";
import React from "react";
import {Text} from "../../typography/text/text";
import {Digits} from "../../typography/digits/digits";
import {COLOR_INACTIVE, DIGITS_LARGE, DISPLAY_SMALL, TEXT_MOBILE, TOrder} from "../../../utils/types";

type TOrderDetails = Pick<TOrder, 'number'>

export function OrderDetails({number}:TOrderDetails):JSX.Element {

  return (
    <div className={`${styles.modalContainer} pt-4 pb-20`}>
      <Digits size={DIGITS_LARGE} extraClass={`mb-8 ${styles.blue}`}>{number}</Digits>
      <Text size={DISPLAY_SMALL} extraClass={"mb-15"}>Идентификатор заказа</Text>
      <div className={`${styles.iconDone} mb-15`}></div>
      <Text size={TEXT_MOBILE} extraClass={"mb-2"}>Ваш заказ начали готовить</Text>
      <Text size={TEXT_MOBILE} color={COLOR_INACTIVE}>Дождитесь готовности на орбитальной станции</Text>
    </div>
  )
}