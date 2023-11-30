import React from "react";
import {Orders} from "../components/orders/orders";
import {connectProfile, disconnectProfile} from "../utils/data";
import {useDispatch} from "react-redux";

export function ProfileOrders() {

  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken")?.slice(7) ?? ""
  React.useEffect(() => {
    dispatch(connectProfile(token));
    return () => {
      dispatch(disconnectProfile());
    }
  }, []);

  return (
    <Orders/>
  )
}