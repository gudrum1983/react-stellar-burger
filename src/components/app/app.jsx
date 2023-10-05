import React from "react";
import styles from "./app.module.css";
import {AppHeader} from '../app-header/app-header'
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {Modal} from "../modal/modal";
import {OrderDetails} from "../modal/order-details/order-details";
import {IngredientDetails} from "../modal/ingredient-details/ingredient-details";
import {CLOSE_MODAL} from "../../services/actions/modal";
import {useDispatch, useSelector} from "react-redux";
import {CLEAR_INGREDIENT_DETAILS} from "../../services/actions/ingredient-details";
import {getBurgerIngredients} from "../../services/actions/burger-ingredient";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {ADD_FILLING, CHOOSE_BUN} from "../../services/actions/burger-constructor";
import uuid from "react-uuid";

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getBurgerIngredients())
  }, [])

  const showModal = useSelector(store => store.showModal)
  const downloadedAppData = useSelector(store => store.burgerIngredients)

  const {ingredients, isLoading, hasError} = downloadedAppData;

  function handleCloseModal() {
    dispatch({type: CLOSE_MODAL})
    if (showModal.type === "ingredient") {
      dispatch({type: CLEAR_INGREDIENT_DETAILS})
    }
  }

  function modal(comnonent) {
    let header = "";
    if (showModal.type === "ingredient") {
      header = "Детали ингредиента";
    } else if (showModal.type === "error") {
      header = "Ошибка"
    }
    return (
      <Modal onClose={handleCloseModal} header={header}>
        {comnonent}
      </Modal>)
  }

  const handleDrop = (ingredient) => {


    const numberIngredient = uuid();

if (ingredient.type === "bun") {
  dispatch({
    type: CHOOSE_BUN, payload: ingredient})
} else {
  dispatch({
    type: ADD_FILLING, payload: {
      numberIngredient: numberIngredient,
      ingredient: ingredient,
    }
  })
}
  };



  return (
    <div className={`text text_type_main-default ${styles.app}`}>
      {isLoading && 'Загрузка...'}
      {hasError && 'Произошла ошибка'}
      {!isLoading &&
        !hasError &&
        ingredients.length &&
        <>
          <AppHeader/>
          <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
              <section className={`pl-5 pr-5 ${styles.sectionClass}`}>
                <BurgerIngredients ingredients={ingredients}
                />
              </section>
              <section className={`pl-5 pr-5 ${styles.sectionClass}`}>
                <BurgerConstructor onDropHandler={handleDrop}/>
              </section>
            </DndProvider>
          </main>
          {showModal.visible && showModal.type === "order" && modal(<OrderDetails/>)}
          {showModal.visible && showModal.type === "error" && modal(<p className="text text_type_main-medium">
            Наш краторный хмель пожрал антарианский долгоносик, попробуйте сформировать заказ позже, Милорд...
          </p>)}
          {showModal.visible && showModal.type === "ingredient" && modal(<IngredientDetails
            ingredient={showModal.ingredient}/>)}
        </>}
    </div>
  )
}

export default App;
