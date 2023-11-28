import React from "react";
import {Orders} from "../components/orders/orders";
import {
  connectFeedOrdersProfile,
  disconnectFeedOrdersProfile
} from "../services/feed-orders-profile/feed-orders-actions";
import {connectPr, connectProfile, disconnectPr, disconnectProfile, URL_WS_OWNER} from "../utils/data";
import {useMatch} from "react-router-dom";
import {useDispatch} from "react-redux";


export function ProfileOrders() {
  const dispatch = useDispatch();

/*  const isProfile = useMatch({path: "/profile/orders", end: false});*/

  React.useEffect(() => {
/*    if (isProfile) {*/
    dispatch(connectProfile());
      return () => {
        dispatch(disconnectProfile());
/*      }*/
    }
  }, []);




  return (
    <Orders/>
  )
}
