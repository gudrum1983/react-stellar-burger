import {Link, useLocation, useMatch} from "react-router-dom";
import styles from "./card-order.module.css";
import {Ingredients} from "./ingredients/ingredients";
import React, {FC} from "react";
import {pagePath} from "../../utils/constants";
import {OrderPrice} from "../order-price/order-price";
import {Text} from "../typography/text/text";
import {Digits} from "../typography/digits/digits";
import {DateWithTimezone} from "../typography/date/date";
import {COLOR_SUCCESS, DISPLAY_SMALL, TPropsCardOrder} from "../../utils/types";


/**
 * Карточка заказа из ленты заказов
 * @param order - заказ
 */
export const CardOrder : FC<TPropsCardOrder> = ({order}) => {

  const isFeed = useMatch({path: pagePath.feed, end: false});
  const location = useLocation()
  const {ingredients, number, name, status, createdAt} = order
  const numberToString = number.toString()

  return (
    <li>
      <Link className={`nonlink ${styles.cardOrder}`} to={numberToString} state={{background: location}}>
        <div className="orderId">
          <Digits># {number}</Digits>
          {DateWithTimezone({value: createdAt})}
        </div>
        <div>
          <Text size={DISPLAY_SMALL}>{name}</Text>
          {!isFeed && (status === "done") &&
            <Text extraClass='pt-2' color={COLOR_SUCCESS}>Выполнен</Text>}
          {!isFeed && (status !== "done") && <Text extraClass='pt-2'>B работе</Text>}
        </div>
        <div className={styles.orderComponentsAndPrice}>
          <div className={`${styles.orderComponents} relative`}>
            {ingredients.map((item, index, arrayIng) => {
              if (index < 6) {
                return (<Ingredients key={`${number}${index}`} index={index}
                                     ingredient={item} {...(index === 5 && arrayIng.length > 6 && {count: (arrayIng.length - 5)})}></Ingredients>)
              }
            })}
          </div>
          <OrderPrice ingredients={ingredients}/>
        </div>
      </Link>
    </li>
  )
}