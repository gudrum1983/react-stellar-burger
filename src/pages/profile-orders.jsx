import React from "react";
import {Orders} from "../components/orders/orders";
import {
  connectFeedOrdersProfile,
  disconnectFeedOrdersProfile
} from "../services/feed-orders-profile/feed-orders-actions";
import {URL_WS_OWNER} from "../utils/data";
import {useMatch} from "react-router-dom";
import {useDispatch} from "react-redux";


export function ProfileOrders() {
  const dispatch = useDispatch();
  const connectPr = () => dispatch(connectFeedOrdersProfile(URL_WS_OWNER))
  const disconnectPr = () => dispatch(disconnectFeedOrdersProfile())

/*  const isProfile = useMatch({path: "/profile/orders", end: false});*/

  React.useEffect(() => {
/*    if (isProfile) {*/
      connectPr();
      return () => {
        disconnectPr()
/*      }*/
    }
  }, []);




  return (
    <Orders/>
  )
}
