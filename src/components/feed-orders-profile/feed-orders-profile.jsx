import {Button, CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-orders-profile.module.css";
import React from "react";
import {feedOrders, order1, order2, order3} from "../../utils/data";
import {useSelector} from "react-redux";
import {burgerIngredientsArray} from "../../services/burger-ingredients/burger-ingredients-selector";
import {Link, useLocation, useParams} from "react-router-dom";
import styless from "../../components/burger-ingredients/ingredient/ingredient.module.css";

export function FeedHistory() {
  let isFeed = false
  const location = useLocation();
  console.log({location})
  if (location.pathname === "/feed") {
    isFeed = true
  }
  return (
    <div className={`${styles.containerFeed} custom-scroll`}>
      {feedOrders.map((item) => (
        <CardOrderFeedHistory item={item} key={item.numberOrder} isFeed={isFeed}></CardOrderFeedHistory>
      ))}
    </div>
  )

}


export function CardOrderFeedHistory({item, isFeed}) {

  const location = useLocation()

  return (
    <Link className={`${styless.nonlink} ${styles.cardOrder}`} to={item.numberOrder} state={{background: location}}>
      <div className={styles.orderId}>
        <p className="text text_type_digits-default">#{item.numberOrder}</p>
        <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(item.orderDate)} /> i-GMT+3</p>

      </div>
      <div>
        <p className="text text_type_main-medium">
          {item.nameOrder}
        </p>
        {!isFeed && <p className="text text_type_main-default pt-2">
          {item.orderStatus}
        </p>}
      </div>
      <div className={styles.orderComponentsAndPrice}>
        <div className={`${styles.orderComponents} ${styles.relative}`}>
          {item.componentsOrder.map((itemIng, index, arrayIng) => {
            if (index < 6) {
              return (<ImgIng index={index}
                              itemIng={itemIng} {...(index === 5 && arrayIng.length > 6 && {count: arrayIng.length - 5})}></ImgIng>)
            }
          })}
        </div>
        <div className={styles.orderPrice}>
          <div className={`${styles.orderTextPrice} text text_type_digits-default pr-2`}>{888}</div>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </Link>
  )
}

export function ImgIng({itemIng, index, count = null}) {

  const ingredients = useSelector(burgerIngredientsArray)

  const marginLeft = index * 48
  const postIndex = 6 - index
  const image_mobile_find = (idIng) => {
    const currentIngredient = ingredients.find((itemIng) => (itemIng._id === idIng));
    return currentIngredient.image_mobile
  }

  return (
    <Button
      style={{left: marginLeft, zIndex: postIndex}}
      htmlType="button" type="primary" extraClass={`${styles.buttonCardSmall} ${styles.absolute}`}
      index={index} key={`${index}_${itemIng}`}>

      <div className={styles.imgCardSmall} style={{backgroundImage: `url(${image_mobile_find(itemIng)})`}}>
        {count && <div className={styles.imgCardSmallFonNumber}>{`+${count}`}</div>}

      </div>

    </Button>
  )

}


export function DetailsCardOrder() {

  const params = useParams()
  const location = useLocation()
  const idCurrentItem = params.id
   const background = location.state && location.state.background;

  const item = [order1, order2, order3].find(order => order.numberOrder === idCurrentItem)

  /*  const currentIngredient = ingredients.find(item => item._id === idCurrentItem);
    const {proteins, calories, fat, carbohydrates, name, image_large} = currentIngredient*/
const styleCard = background ? styles.cardOrder3 : styles.cardOrder2

  return (
    <div className={styleCard}>
      {!background && <p className="text text_type_digits-default mlr-auto mb-10 ">#{item.numberOrder}</p>}

      <div className="mb-15">
        <p className="text text_type_main-medium mb-3">
          {item.nameOrder}
        </p>
        <p className="text text_type_main-default">
          {item.orderStatus}
        </p>
      </div>
      <p className="text text_type_main-medium mb-6">
        Состав:
      </p>
      <ItemsIng componentsOrder={item.componentsOrder}/>
      <div className={`${styles.orderId} pt-10`}>


        <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(item.orderDate)} /> i-GMT+3</p>

{/*        <p
          className="text text_type_main-default text_color_inactive">{item.orderDate}</p>*/}
        <div className={styles.orderPrice}>
          <div className={`${styles.orderTextPrice} text text_type_digits-default pr-2`}>{888}</div>
          <CurrencyIcon type="primary"/>
        </div>

      </div>
    </div>
  )
}


export function ItemsIng({componentsOrder}) {

  return (
    <div className={`${styles.containerFeed2} custom-scroll`}>
      {componentsOrder.map((item, index) => (
        <ItemIng idIng={item} index={index}/>
      ))}
    </div>
  )

}

export function ItemIng({idIng, index}) {

  const ingredients = useSelector(burgerIngredientsArray)
  const currentIngredient = ingredients.find((itemIng) => (itemIng._id === idIng))
  const {image_mobile, name, price} = currentIngredient


  return (
    <div className={styles.rowIng}>
      <Button
        htmlType="button" type="primary" extraClass={styles.buttonCardSmall}
        key={`${index}_${idIng}`}>

        <div className={styles.imgCardSmall} style={{backgroundImage: `url(${image_mobile})`}}>
        </div>

      </Button>
      <p
        className="text text_type_main-default">{name}</p>
      <div className={styles.orderPrice2}>
        <div className={`${styles.orderTextPrice} text text_type_digits-default pr-2`}>{price}</div>
        <CurrencyIcon type="primary"/>
      </div>

    </div>


  )

}