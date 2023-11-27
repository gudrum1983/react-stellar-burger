import {useLocation, useMatch, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styles from "./order-info.module.css";
import {IngredientsItems} from "./ingredients-items/ingredients-items";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

import {digitsSmall, displaySmall, formattedData, textDefault} from "../../utils/inputs";
import {WebsocketStatus} from "../../utils/constants";
import {connectFeedOrders, disconnectFeedOrders} from "../../services/feed-orders/feed-orders-actions";
import {URL_WS_ALL, URL_WS_OWNER} from "../../utils/data";
import {
  connectFeedOrdersProfile,
  disconnectFeedOrdersProfile
} from "../../services/feed-orders-profile/feed-orders-actions";
import {burgerIngredientsMap} from "../../services/burger-ingredients/burger-ingredients-selector";
import {
  orderDetails,
  orderDetailsRequest
} from "../../services/order-details/order-details-selectors";
import {clearOrderDetails, getInfoOrderDetails} from "../../services/order-details/order-details-actions";


export function OrderInfo() {


  const dispatch = useDispatch();
  const params = useParams()
  const location = useLocation()
  const isFeed = useMatch({path: "feed/:id"});
  /*
    const isFeed = (location.pathname.indexOf("/feed") === 0) //проверяем что строка "/profile" находится именно в начале pathname
  */
  console.log({isFeed})
  const {status, data} = useSelector(store => isFeed ? store.feedOrders : store.feedOrdersProfile)
  const {orderRequest, orderFailed, order} = useSelector(orderDetails)
  const number = order?.number
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

  console.log({data, order})

  const test1 = data?.orders?.find(order => order.number === Number(idCurrentItem))

  const test2 = order

  const infoOrderDetails = test1 ? test1 : test2

  const item = infoOrderDetails


  const sum = 589666
  const mapIngredients = useSelector(burgerIngredientsMap)

  /*  const orders = data?.orders
    const item = orders?.find(tet => tet.number === Number(idCurrentItem))*/

  /*  React.useEffect(() => {
      let newSum = sum
  if (!!item?.ingredients) {
      item.ingredients.forEach((ing) => {
        if (mapIngredients.has(ing)) {
          const {price} = mapIngredients.get(ing)
          newSum = (newSum + price)
        }
      })}

      setSum(newSum)
    }, [])*/


  React.useEffect(() => {
    if (!infoOrderDetails) {
      dispatch(getInfoOrderDetails(idCurrentItem))
    }

    return () => {
      dispatch(clearOrderDetails())
    }


  }, [])


  /*  if (!item) {
      if (isFeed) {
        dispatch(openErrorModal(`Заказ с номером ${idCurrentItem} не найден, Милорд... Проверьте есть ли интересующий вас заказ в ленте заказов! `));
        return <Navigate to={"/feed"}/>
      } else {
        dispatch(openErrorModal(`Заказ с номером ${idCurrentItem} не найден в вашем профиле, Милорд... Проверьте есть ли интересующий вас заказ в вашей истории заказов! `));
        return <Navigate to={"/profile/orders"}/>
      }


    }*/


  if (isDisconnected || !data?.success) {
    return (
      <p className="text text_type_main-medium">
        Загрузка...
      </p>
    )

  }

  const styleCard = background ? styles.cardOrder3 : styles.cardOrder2

  return (
    <>
      {item &&<div className={styleCard}>
        {!background && digitsSmall({value: `#${item.number}`})}
        <div className="mb-15">
          {displaySmall({value: item.name, extraClass: 'mb-3'})}
          {textDefault({value: item.status})}
        </div>
        {displaySmall({value: 'Состав:', extraClass: 'mb-6'})}
        <IngredientsItems componentsOrder={item.ingredients}/>
        <div className="orderId pt-10">
          {formattedData({value: item.createdAt, addText: " i-GMT+3"})}
          <div className="orderPrice">
            {digitsSmall({value: sum, extraClass: 'pr-2'})}
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div> }
    </>

  )
}