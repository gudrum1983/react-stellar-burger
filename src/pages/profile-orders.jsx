import React from "react";
import {Orders} from "../components/orders/orders";
import {connectProfile, disconnectProfile} from "../utils/data";
import {useDispatch, useSelector} from "react-redux";
import {
  selectorProfileOrdersData,
  selectorProfileOrdersStatus
} from "../services/feed-orders-profile/feed-orders-selector";
import {WebsocketStatus} from "../utils/constants";
import {Preloader} from "../components/preloader/preloader";

export function ProfileOrders() {

  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken")?.slice(7) ?? ""

  const data = useSelector(selectorProfileOrdersData)
  const status = useSelector(selectorProfileOrdersStatus)
  const isDisconnected = status !== WebsocketStatus.ONLINE

  React.useEffect(() => {
    dispatch(connectProfile(token));
    return () => {
      dispatch(disconnectProfile());
    }
  }, []);

  if( isDisconnected || !data ) {
    return <Preloader/>
  }

if(!isDisconnected && !!data){

  return (
    <Orders/>
  )
}

}