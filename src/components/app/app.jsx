import React from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "./app.module.css";
import {BrowserRouter, Routes, Route, useParams, useLocation, useNavigate} from "react-router-dom";
import { OrderConstructor} from "../../pages/order-constructor";

import {AppHeader} from '../app-header/app-header'
import {Modal} from "../modal/modal";
import {OrderDetails} from "../modal/order-details/order-details";
import {IngredientDetails} from "../modal/ingredient-details/ingredient-details";

import {loadBurgerIngredients} from "../../services/burger-ingredients/burger-ingredients-actions";

import {addFilling, chooseBun} from "../../services/burger-constructor/burger-constructor-actions";

import {clearOrderDetails} from "../../services/order-details/order-details-actions";
import {orderDetails} from "../../services/order-details/order-details-selectors";

import {burgerIngredients} from "../../services/burger-ingredients/burger-ingredients-selector";

import {clearIngredientDetails} from "../../services/ingredient-details/ingredient-details-actions";
import {ingredientDetails} from "../../services/ingredient-details/ingredient-details-selector";

import { checkUserAuth } from "../../services/user/action";
import { OnlyAuth, OnlyUnAuth } from "./protected-route";
import {Register} from "../../pages/register";
import {Login} from "../../pages/login";
import {ForgotPassword} from "../../pages/forgot-password";
import {ResetPassword} from "../../pages/reset-password";
import {Profile} from "../../pages/profile";
import {FeedOrders} from "../../pages/feedOrders";

export default function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkUserAuth());
  }, []);


  React.useEffect(() => {
    dispatch(loadBurgerIngredients())
  }, [])


  const {orderNumber, orderRequest ,orderFailed} = useSelector(orderDetails)
  const showIngredientDetails = useSelector(ingredientDetails)
  const {ingredients, isLoading, hasError} = useSelector(burgerIngredients);

  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  function handleCloseModal() {
    if (showIngredientDetails) {
      dispatch(clearIngredientDetails())
    } else {
      dispatch(clearOrderDetails())
    }
  }

  function modal(content, header = "") {
    return (
      <Modal onClose={handleCloseModal} header={header}>
        {content}
      </Modal>)
  }

/*  function modalIng(content, header = "") {
    return (
      <Modal onClose={handleModalClose} header={header}>
        {content}
      </Modal>)
  }*/

  const handleDrop = (ingredient) => {
    if (ingredient.type === "bun") {
      dispatch(chooseBun(ingredient))
    } else {
      dispatch(addFilling(ingredient))
    }
  };

  if (isLoading) {
    return <div className={`text text_type_main-default`}>Загрузка...</div>
  } else {
    if (hasError) {
      return <div className={`text text_type_main-default`}>Произошла ошибка</div>
    } else if (ingredients.length === 0) {
      return <div className={`text text_type_main-default`}>Нет данных</div>
    }
  }





  return (
    <div className={`${styles.app}`}>


        <AppHeader/>
        <Routes location={background || location}>

          <Route path="/" element={<OrderConstructor handleDrop={handleDrop} />} />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route path="/login" element={<OnlyUnAuth component={<Login/>} />} />
          <Route path="/register" element={<OnlyUnAuth component={<Register/>} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword/>} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword/>} />} />
          <Route path="/profile" element={<OnlyAuth component={<Profile/>} />} />
          <Route path="/feed" element={<OnlyAuth component={<FeedOrders/>} />} />
          <Route path="/profile/orders" element={<OnlyAuth component={<Profile/>} />} />
          <Route path="/profile/exit" element={<OnlyAuth component={<Profile/>} />} />


      {orderNumber && modal(<OrderDetails/>)}
      {orderFailed && modal(<p className="text text_type_main-medium">
        Наш краторный хмель пожрал антарианский долгоносик, попробуйте сформировать заказ позже, Милорд...
      </p>, "Ошибка")}
      {orderRequest && modal('',"Загрузка Милорд...")}
{/*      {showIngredientDetails && modal(<IngredientDetails
        ingredient={showIngredientDetails}/>, "Детали ингредиента")}*/}
        </Routes>

        {background &&
          <Routes>
            <Route path="/ingredients/:id" element={
              <Modal onClose={handleModalClose} header={"Детали ингредиента"}>
                <IngredientDetails />
              </Modal>}/>
            </Routes>}




    </div>

  )
}