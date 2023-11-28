import {Link, useLocation, useMatch} from "react-router-dom";
import styles from "./card-order.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Ingredients} from "./ingredients/ingredients";
import React from "react";
import {digitsSmall, displaySmall, formattedData, textDefault} from "../../utils/text-elements";
import {OrderPrice} from "../order-price/order-price";

export function CardOrder({order}) {

  const isFeed = useMatch({path: "feed", end: false});
  const location = useLocation()
  const {ingredients,number, name, status, createdAt } = order

  const numberToString = number.toString()



  return (
    <li>
      <Link className={`nonlink ${styles.cardOrder}`} to={numberToString} state={{background: location}}>
        <div className="orderId">
          {digitsSmall({value: `#${number}`})}
          {formattedData({value: createdAt, addText: " i-GMT+3"})}
        </div>
        <div>
          {displaySmall({value: name})}
          {!isFeed && textDefault({value: status, extraClass: 'pt-2'})}
        </div>
        <div className={styles.orderComponentsAndPrice}>
          <div className={`${styles.orderComponents} relative`}>
            {ingredients.map((item, index, arrayIng) => {
              if (index < 6) {
                return (<Ingredients key={`${number}${index}`} index={index}
                                     ingredient={item} {...(index === 5 && arrayIng.length > 6 && {count: arrayIng.length - 5})}></Ingredients>)
              }
            })}
          </div>
          <OrderPrice ingredients={ingredients}/>
        </div>
      </Link>
    </li>
  )
}