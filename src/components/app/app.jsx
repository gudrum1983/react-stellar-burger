import React from "react";
import styles from "./app.module.css";
import {AppHeader} from '../app-header/app-header'
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {Modal} from "../modal/modal";
import {OrderDetails} from "../modal/order-details/order-details";
import {IngredientDetails} from "../modal/ingredient-details/ingredient-details";
import {SelectedIngredientsContext} from "../../services/burgerConstructorContext";
import {ShowModalContext} from "../../services/modalContext";
import {reducerSelectedIngredients} from "../../services/reducer/burgerConstructor";
import {getIngredientsData} from "../../api/config";

function App() {

  React.useEffect(() => {
    fillIngredientContext();
  }, [])

  //создать константу для начального состояния стейта
  const selectedIngredientsInitialState = {bun: {}, other: []};

  //заменить UseState на UseReducer
  const [selectedIngredients, selectedIngredientsDispatcher] = React.useReducer(reducerSelectedIngredients, selectedIngredientsInitialState, undefined);

  const [downloadedAppData, setDownloadedAppData] = React.useState({
    isLoading: false,
    hasError: false,
    ingredients: [],
    defaultBun: {},
  });

  //создать константу для начального состояния стейта
  const showModalInitialState = {
    visible: false,
    type: "",
    ingredient: {},
    orderNumber: "",
  };

  //Создать функцию reducer
  function reducerShowModal(state, action) {
    switch (action.type) {
      case "close":
        return {
          visible: false,
          type: "",
          ingredient: {},
          orderNumber: "",
        }
          ;
      case "open":
        return {
          visible: true,
          type: action.payload.type,
          ingredient: action.payload.ingredient,
          orderNumber: action.payload.orderNumber ??= "",
        };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }
  //заменить UseState на UseReducer
  const [showModal, showModalDispatcher] = React.useReducer(reducerShowModal, showModalInitialState, undefined);

  function findDefaultBun(ingredientsData) {
    if (ingredientsData) {
      const defaultBun = ingredientsData.find(item => item.type === "bun")
      selectedIngredientsDispatcher({type: 'defineBun', payload: defaultBun});
      return defaultBun
    } else {
      return {}
    }
  }

  function fillIngredientContext() {
    setDownloadedAppData({...downloadedAppData, hasError: false, isLoading: true});
    // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
    // return позволяет потом дальше продолжать цепочку `then, catch, finally`
    return getIngredientsData()
      .then(data => data.data)
      .then(ingredientsData =>
        setDownloadedAppData(
          {
            ...downloadedAppData,
            ingredients: sortedData(ingredientsData),
            isLoading: false,
            defaultBun: findDefaultBun(ingredientsData),
          }))
      .catch(() => {
        setDownloadedAppData(
          {
            ...downloadedAppData,
            hasError: true,
            isLoading: false
          });
      });
  }

  const {ingredients, isLoading, hasError} = downloadedAppData;

  const sortedData = (data) => data.toSorted((a, b) => a._id > b._id ? 1 : -1)

  function handleCloseModal() {
    showModalDispatcher({type: 'close'})
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
        {showModal.type === "error" && <p className="text text_type_main-medium">
          Наш краторный хмель пожрал антарианский долгоносик, попробуйте сформировать заказ позже, Милорд...
        </p> }
      </Modal>)
  }

  return (
    <div className={`text text_type_main-default ${styles.app}`}>
      {isLoading && 'Загрузка...'}
      {hasError && 'Произошла ошибка'}
      {!isLoading &&
        !hasError &&
        ingredients.length &&
        <>
          <AppHeader/>
          <SelectedIngredientsContext.Provider value={{selectedIngredients, selectedIngredientsDispatcher}}>
            <ShowModalContext.Provider value={{showModal, showModalDispatcher}}>
              <main className={styles.main}>
                <section className={`pl-5 pr-5 ${styles.sectionClass}`}>
                  <BurgerIngredients ingredients={ingredients}
                  />
                </section>
                <section className={`pl-5 pr-5 ${styles.sectionClass}`}>
                  <BurgerConstructor/>
                </section>
                {showModal.visible && showModal.type === "order" && modal(<OrderDetails/>)}
                {showModal.visible && showModal.type === "error" && modal()}
                {showModal.visible && showModal.type === "ingredient" && !!(showModal.ingredient) && modal(
                  <IngredientDetails ingredient={showModal.ingredient}/>)}
              </main>
            </ShowModalContext.Provider>
          </SelectedIngredientsContext.Provider>
        </>
      }
    </div>
  )
}

export default App;
