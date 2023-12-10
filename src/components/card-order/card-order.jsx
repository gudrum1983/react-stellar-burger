import {Link, useLocation, useMatch} from "react-router-dom";
import styles from "./card-order.module.css";
import {Ingredients} from "./ingredients/ingredients";
import React from "react";
import {sizesDigits, colorsText, sizesText, pagePath} from "../../utils/constants";
import {OrderPrice} from "../order-price/order-price";
import {Text} from "../typography/text/text";
import {Digits} from "../typography/digits/digits";
import {objectPropType} from "../../utils/prop-types";
import {DateWithTimezone} from "../typography/date/date";


/**
 * Карточка заказа из ленты заказов
 * @param {object} order - заказ
 */
export function CardOrder({order}) {

  const isFeed = useMatch({path: pagePath.feed, end: false});
  const location = useLocation()
  const {ingredients, number, name, status, createdAt} = order

  const numberToString = number.toString()

  return (
    <li>
      <Link className={`nonlink ${styles.cardOrder}`} to={numberToString} state={{background: location}}>
        <div className="orderId">
          <Digits size={sizesDigits.small}># {number}</Digits>
          {DateWithTimezone({value: createdAt})}
        </div>
        <div>
          <Text size={sizesText.displaySmall}>{name}</Text>
          {!isFeed && (status === "done") &&
            <Text size={sizesText.textDesktop} extraClass='pt-2' color={colorsText.success}>Выполнен</Text>}
          {!isFeed && (status !== "done") && <Text size={sizesText.textDesktop} extraClass='pt-2'>B работе</Text>}
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

CardOrder.propTypes = {
  order: objectPropType,
}