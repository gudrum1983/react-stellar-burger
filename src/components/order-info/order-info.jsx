import {Navigate, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import styles from "./order-info.module.css";
import styless from "../card-order/card-order.module.css";
import {IngredientsItems} from "./ingredients-items/ingredients-items";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";

import {digitsSmall, displaySmall, formattedData, textDefault} from "../../utils/inputs";
import useSum from "../../hooks/useSum";

import {closeErrorModal, openErrorModal} from "../../services/error-modal/error-modal-action";
import {WebsocketStatus} from "../../utils/constants";
import {connectFeedOrders, disconnectFeedOrders} from "../../services/feed-orders/feed-orders-actions";
import {URL_WS_ALL, URL_WS_OWNER} from "../../utils/data";
import {
  connectFeedOrdersProfile,
  disconnectFeedOrdersProfile
} from "../../services/feed-orders-profile/feed-orders-actions";
import {burgerIngredientsMap} from "../../services/burger-ingredients/burger-ingredients-selector";


export function OrderInfo() {

  const {order, setOrder} = useState()
  const dispatch = useDispatch();
  const params = useParams()
  const location = useLocation()
  const isFeed = (location.pathname.indexOf("/feed") === 0) //проверяем что строка "/profile" находится именно в начале pathname
  const {status, data} = useSelector(store => isFeed ? store.feedOrders : store.feedOrdersProfile)
  const idCurrentItem = params.id
  const background = location.state && location.state.background;
  const isDisconnected = status !== WebsocketStatus.ONLINE

  const connect = () => dispatch(connectFeedOrders(URL_WS_ALL))
  const connectPr = () => dispatch(connectFeedOrdersProfile(URL_WS_OWNER))
  const disconnect = () => dispatch(disconnectFeedOrders())
  const disconnectPr = () => dispatch(disconnectFeedOrdersProfile())

  React.useEffect(() => {
    if (isFeed && isDisconnected) {
      connect();
      return () => {
        disconnect()
      }
    } else if (!isFeed && isDisconnected) {
      connectPr();
      return () => {
        disconnectPr()
      }
    }


  }, []);


  const [sum, setSum] = React.useState(0)
/*  const {status, data} = useSelector(store => isFeed ? store.feedOrders : store.feedOrdersProfile)*/
  const mapIngredients = useSelector(burgerIngredientsMap)

  const orders = data?.orders
  const item = orders?.find(tet => tet.number === Number(idCurrentItem))

  React.useEffect(() => {
    let newSum = sum
if (!!item?.ingredients) {
    item.ingredients.forEach((ing) => {
      if (mapIngredients.has(ing)) {
        const {price} = mapIngredients.get(ing)
        newSum = (newSum + price)
      }
    })}

    setSum(newSum)
  }, [])


  if (!item) {
    if (isFeed) {
      dispatch(openErrorModal(`Заказ с номером ${idCurrentItem} не найден, Милорд... Проверьте есть ли интересующий вас заказ в ленте заказов! `));
      return <Navigate to={"/feed"}/>
    } else {
      dispatch(openErrorModal(`Заказ с номером ${idCurrentItem} не найден в вашем профиле, Милорд... Проверьте есть ли интересующий вас заказ в вашей истории заказов! `));
      return <Navigate to={"/profile/orders"}/>
    }


  }


  if (isDisconnected || !data?.success) {
    return (
      <p className="text text_type_main-medium">
        Загрузка...
      </p>
    )

  }

  const styleCard = background ? styles.cardOrder3 : styles.cardOrder2

  return (
    <div className={styleCard}>
      {!background && digitsSmall({value: `#${item.number}`})}
      <div className="mb-15">
        {displaySmall({value: item.name, extraClass: 'mb-3'})}
        {textDefault({value: item.status})}
      </div>
      {displaySmall({value: 'Состав:', extraClass: 'mb-6'})}
      <IngredientsItems componentsOrder={item.ingredients}/>
      <div className={`${styless.orderId} pt-10`}>
        {formattedData({value: item.createdAt, addText: " i-GMT+3"})}
        <div className={styless.orderPrice}>
          {digitsSmall({value: sum, extraClass: 'pr-2'})}
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
}