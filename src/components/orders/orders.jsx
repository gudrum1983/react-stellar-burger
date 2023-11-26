import styles from "./orders.module.css";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useMatch} from "react-router-dom";
import {WebsocketStatus} from "../../utils/constants";
import {
  connectFeedOrdersProfile,
  disconnectFeedOrdersProfile
} from "../../services/feed-orders-profile/feed-orders-actions";
import { URL_WS_OWNER} from "../../utils/data";
import {CardOrder} from "../card-order/card-order";


export function Orders() {

  const dispatch = useDispatch();
/*  const connectPr = () => dispatch(connectFeedOrdersProfile(URL_WS_OWNER))*/
/*  const disconnectPr = () => dispatch(disconnectFeedOrdersProfile())*/

  const isProfile = useMatch({path: "/profile/orders", end: false});

 /* React.useEffect(() => {
    if (isProfile) {
      connectPr();
      return () => {
        disconnectPr()
      }
    }
  }, []);*/

  const {status, data} = useSelector(store => isProfile ? store.feedOrdersProfile : store.feedOrders )

  const isDisconnected = status !== WebsocketStatus.ONLINE

  const orders = React.useMemo(
    () =>  data?.orders,
    [data]
  );

  if (!isDisconnected && orders) {
    return (
      <ul className={`${styles.containerFeed} nonList custom-scroll`}>
        {orders.map((item) => (
            <CardOrder order={item} key={item._id}></CardOrder>
        ))}
      </ul>
    )
  } else {
    return (<p className="text text_type_main-medium">
      Загрузка...
    </p>)
  }
}


