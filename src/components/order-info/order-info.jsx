import {useLocation, useMatch, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styles from "./order-info.module.css";
import {IngredientsItems} from "./ingredients-items/ingredients-items";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import {WebsocketStatus} from "../../utils/constants";
import {connectFeed, connectProfile, disconnectFeed, disconnectProfile,} from "../../utils/data";
import {burgerIngredientsMap} from "../../services/burger-ingredients/burger-ingredients-selector";
import {orderDetails, orderDetailsInfo,} from "../../services/order-details/order-details-selectors";
import {clearOrderDetails, getInfoOrderDetails} from "../../services/order-details/order-details-actions";
import {digitsSmall, displaySmall, formattedData, textDefault} from "../../utils/text-elements";


export function OrderInfo() {

  //todo Исправить или понять как исправить ошибку "No routes matched location"

  const dispatch = useDispatch();

  const params = useParams()
  const idCurrentItem = params.id

  const location = useLocation()
  const background = location.state && location.state.background;

  const isFeed = useMatch({path: "/feed", end: false});
  const isProfile = useMatch({path: "/profile", end: false});

  const {status} = useSelector(store => isFeed ? store.feedOrders : store.feedOrdersProfile)
  const isDisconnected = status !== WebsocketStatus.ONLINE

  const {orderRequest, orderFailed} = useSelector(orderDetails)


  React.useEffect(() => {
    if (isFeed && isDisconnected) {
      dispatch(connectFeed());
      return () => {
        dispatch(disconnectFeed())
      }
    } else if (isProfile && isDisconnected) {
      dispatch(connectProfile());
      return () => {
        dispatch(disconnectProfile());
      }
    }
  }, []);

  const order = useSelector(store => {

    let order = store.feedOrders.data?.find(order => order.number === idCurrentItem)
    if (order) {
      return order;
    }

    order = store.feedOrdersProfile.data?.find(order => order.number.toString() === idCurrentItem)
    if (order) {
      return order;
    }

    return store.orderDetails.order

  })

  /*  const infoOrderDetails = React.useMemo(() => {
        if (!!data?.orders) {
          return data.orders.find(order => order.number.toString() === idCurrentItem)
        } else {
          return null
        }
      }, [data]
    )*/


  React.useEffect(() => {
    if (!order) {
      dispatch(getInfoOrderDetails(idCurrentItem))
      return () => {
        dispatch(clearOrderDetails())
      }
    }

  }, [])


  if (isDisconnected) {

    return (

      <>
        {displaySmall({value: "Загрузка --- isDisconnected...",})}
      </>
    )
  }

  if (orderRequest) {

    return (

      <>
        {displaySmall({value: "Загрузка orderRequest",})}
      </>
    )
  }


  if (!orderRequest || !order) {


    console.log()

    return (

      <>
        {displaySmall({value: "!orderRequest || !order",})}
      </>
    )
  }


  const styleCard = background ? styles.cardOrder3 : styles.cardOrder2
  const sum = "4589"


  if (order) {
    return (
      <div className={styleCard}>
        {!background && digitsSmall({value: `#${order.number}`})}
        <div className="mb-15">
          {displaySmall({value: order.name, extraClass: 'mb-3'})}
          {textDefault({value: order.status})}
        </div>
        {displaySmall({value: 'Состав:', extraClass: 'mb-6'})}
        <IngredientsItems componentsOrder={order.ingredients}/>
        <div className="orderId pt-10">
          {formattedData({value: order.createdAt, addText: " i-GMT+3"})}
          <div className="orderPrice">
            {digitsSmall({value: sum, extraClass: 'pr-2'})}
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    )
  }
}