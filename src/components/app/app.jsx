import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from "./app.module.css";

import {AppHeader} from '../app-header/app-header'
import {Modal} from "../modal/modal";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {OrderDetails} from "../modal/order-details/order-details";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {IngredientDetails} from "../modal/ingredient-details/ingredient-details";

import {loadBurgerIngredients} from "../../services/burger-ingredients/burger-ingredients-actions";

import {addFilling, chooseBun} from "../../services/burger-constructor/burger-constructor-actions";

import {clearOrderDetails} from "../../services/order-details/order-details-actions";
import {orderDetails} from "../../services/order-details/order-details-selectors";

import {burgerIngredients} from "../../services/burger-ingredients/burger-ingredients-selector";

import {clearIngredientDetails} from "../../services/ingredient-details/ingredient-details-actions";
import {ingredientDetails} from "../../services/ingredient-details/ingredient-details-selector";



export default function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadBurgerIngredients())
  }, [])

  const {orderNumber, orderRequest ,orderFailed} = useSelector(orderDetails)
  const showIngredientDetails = useSelector(ingredientDetails)
  const {ingredients, isLoading, hasError} = useSelector(burgerIngredients);

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
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <section className={`pl-5 pr-5 ${styles.sectionClass}`}>
            <BurgerIngredients/>
          </section>
          <section className={`pl-5 pr-5 ${styles.sectionClass}`}>
            <BurgerConstructor onDropHandler={handleDrop}/>
          </section>
        </DndProvider>
      </main>
      {orderNumber && modal(<OrderDetails/>)}
      {orderFailed && modal(<p className="text text_type_main-medium">
        Наш краторный хмель пожрал антарианский долгоносик, попробуйте сформировать заказ позже, Милорд...
      </p>, "Ошибка")}
      {orderRequest && modal(null,"Загрузка Милорд...")}
      {showIngredientDetails && modal(<IngredientDetails
        ingredient={showIngredientDetails}/>, "Детали ингредиента")}
    </div>
  )
}