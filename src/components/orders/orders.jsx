import styles from "./orders.module.css";
import React from "react";
import {useSelector} from "react-redux";
import {useMatch} from "react-router-dom";
import {WebsocketStatus} from "../../utils/constants";
import {CardOrder} from "../card-order/card-order";


export function Orders() {

  const isProfile = useMatch({path: "/profile/orders", end: false});

  const {status, data} = useSelector(store => isProfile ? store.feedOrdersProfile : store.feedOrders)

  const isDisconnected = status !== WebsocketStatus.ONLINE

  const orders = React.useMemo(() => {
      let feedOrders = null
    if (data?.orders){
      feedOrders = data.orders
      return !!isProfile ? feedOrders.toReversed() : feedOrders
    }
    },
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


