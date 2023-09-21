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

function App() {

  const url = "https://norma.nomoreparties.space/api/ingredients";

  React.useEffect(() => {
    getAppData();
  }, [])

  //создать константу для начального состояния стейта
  const selectedIngredientsInitialState = {bun: {}, other: []};

  //Создать функцию reducer
  function reducerSelectedIngredients(state, action) {
    switch (action.type) {
      case "defineBun":
        return {
          ...state,
          bun: action.payload
        };
      case "addOther":
        return {
          ...state,
          other: [...state.other,
            {
              numberIngredient: action.payload.numberIngredient,
              ingredient: action.payload.ingredient,
            }]
        };
      case "resetOnlyOther":
        return {
          bun: action.payload,
          other: [],
        };
      case "replaceOther":
        return {
          ...state,
          other: action.payload
        };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  //заменить UseState на UseReducer
  const [selectedIngredients, selectedIngredientsDispatcher] = React.useReducer(reducerSelectedIngredients, selectedIngredientsInitialState, undefined);

//создать константу для начального состояния стейта
  /*  const downloadedAppDataInitialState = {
      isLoading: false,
      hasError: false,
      ingredients: [],
      defaultBun: {},
    };*/

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
  };

  //Создать функцию reducer
  function reducerShowModal(state, action) {
    switch (action.type) {
      case "close":
        return {
          visible: false,
          type: "",
          ingredient: {},
        }
          ;
      case "open":
        return {
          visible: true,
          type: action.payload.type,
          ingredient: action.payload.ingredient
        };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

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


  const getAppData = () => {
    setDownloadedAppData({...downloadedAppData, hasError: false, isLoading: true});
    fetch(url)
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
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
  };

  const {ingredients, isLoading, hasError, defaultBun} = downloadedAppData;

  const sortedData = (data) => data.toSorted(function (a, b) {
    if (a._id > b._id) {
      return 1;
    }
    if (a._id < b._id) {
      return -1;
    }
    return 0;
  });

  function handleCloseModal() {
    showModalDispatcher({type: 'close'})
  }

  function modal(comnonent) {
    let header = "";
    if (showModal.type !== "order") {
      header = "Детали ингредиента";
    }
    return (
      <Modal onClose={handleCloseModal} header={header}>
        {comnonent}
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
                  <BurgerConstructor defaultBun={defaultBun}
                                    />
                </section>
                {showModal.visible && showModal.type === "order" && modal(<OrderDetails/>)}
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
