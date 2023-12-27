import {Navigate, useLocation, useMatch, useParams} from "react-router-dom";
import styles from "./order-info.module.css";
import {IngredientsItems} from "./ingredients-items/ingredients-items";
import React from "react";
import {WebsocketStatus} from "../../utils/config-ws";
import {orderDetails} from "../../services/order-details/order-details-selectors";
import {clearOrderDetails, getInfoOrderDetails} from "../../services/order-details/order-details-actions";
import {pagePath} from "../../utils/constants";
import {openErrorModal} from "../../services/error-modal/error-modal-action";
import {OrderPrice} from "../order-price/order-price";
import {Text} from "../typography/text/text";
import {Digits} from "../typography/digits/digits";
import {DateWithTimezone} from "../typography/date/date";
import {
  selectorProfileOrdersData,
  selectorProfileOrdersStatus
} from "../../services/feed-orders-profile/feed-orders-selector";
import {selectorFeedOrdersData, selectorFeedOrdersStatus} from "../../services/feed-orders/feed-orders-selector";
import {COLOR_SUCCESS, DISPLAY_SMALL, TOrder} from "../../utils/types";
import {useDispatch2, useSelector2} from "../../services/store";

/**
 * карточка с деталями заказа OrderInfo
 */
export function OrderInfo(): JSX.Element {


  const dispatch = useDispatch2();

  const params = useParams()
  const idCurrentItem = params.id

  const location = useLocation()
  const background = location.state && location.state.background;

  const isFeed = useMatch({path: pagePath.feed, end: false});


  const dataFeedProfile = useSelector2(selectorProfileOrdersData)
  const statusFeedProfile = useSelector2(selectorProfileOrdersStatus)
  const dataFeed = useSelector2(selectorFeedOrdersData)
  const statusFeed = useSelector2(selectorFeedOrdersStatus)

  let data = dataFeedProfile
  let status = statusFeedProfile


  if (isFeed) {
    data = dataFeed
    status = statusFeed
  }


  const isDisconnected = status !== WebsocketStatus.ONLINE

  const {orderRequest, order: orderRest} = useSelector2(orderDetails)

  const order = React.useMemo(() => {

    let findOrderWS = null
    let findOrderRest = null

    if (data?.success) {

      const orders: Array<TOrder>  = data.orders

      findOrderWS = orders.find(itemOrder => itemOrder.number === Number(idCurrentItem))
    }

    if (orderRest) {
      findOrderRest = orderRest
    }

    return findOrderWS ? findOrderWS : findOrderRest
  }, [data, orderRest])

  React.useEffect(() => {
    if (!order && idCurrentItem) {
      dispatch(getInfoOrderDetails(idCurrentItem))
      return () => {
        dispatch(clearOrderDetails())
      }
    }
  }, [])


  if (isDisconnected || orderRequest) {
    return (
      <Text size={DISPLAY_SMALL}>Загрузка...</Text>
    )
  }

  const styleCard = background ? styles.cardOrder3 : styles.cardOrder2

  console.log(order)

  if (order) {

    const {number, name, status, ingredients, createdAt } = order

    return (
      <div className={styleCard}>
        {!background && <Digits extraClass={styles.header}># {number}</Digits>}

        <div className="mb-15 ">
          <Text size={DISPLAY_SMALL} extraClass='mb-3'>{name}</Text>
          {(status === "done")
            ? <Text color={COLOR_SUCCESS}>Выполнен</Text>
            : <Text>"B работе"</Text>
          }

        </div>
        <Text size={DISPLAY_SMALL} extraClass='mb-6'>Состав</Text>
        <IngredientsItems componentsOrder={ingredients}/>
        <div className="orderId pt-10">
          {DateWithTimezone({value: createdAt})}
          <OrderPrice ingredients={ingredients}/>
        </div>
      </div>
    )
  } else {
    dispatch(openErrorModal(`Заказ с номером ${idCurrentItem} не найден, Милорд...! `));
    return <Navigate to={pagePath.profileOrdersFull}/>
  }
}