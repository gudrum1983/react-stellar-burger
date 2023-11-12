import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate, Outlet} from "react-router-dom";
import {AppHeader} from '../app-header/app-header'
import {Modal} from "../modal/modal";
import {loadBurgerIngredients} from "../../services/burger-ingredients/burger-ingredients-actions";
import {addFilling, chooseBun} from "../../services/burger-constructor/burger-constructor-actions";
import {clearOrderDetails} from "../../services/order-details/order-details-actions";
import {orderDetails} from "../../services/order-details/order-details-selectors";
import {burgerIngredients} from "../../services/burger-ingredients/burger-ingredients-selector";
import {checkUserAuth} from "../../services/user/user-action";


export function AppLayout() {
  return (
    <>
      <AppHeader/>
      <Outlet/>
    </>
  )
}