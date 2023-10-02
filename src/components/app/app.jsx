import React from "react";
import styles from "./app.module.css";
import {AppHeader} from '../app-header/app-header'
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {Modal} from "../modal/modal";
import {OrderDetails} from "../modal/order-details/order-details";
import {IngredientDetails} from "../modal/ingredient-details/ingredient-details";
import {getIngredientsData} from "../../api/config";
import {CLOSE_MODAL} from "../../services/actions/modal";
import {useDispatch, useSelector} from "react-redux";


function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    fillIngredientContext();
  }, [])

  const showModal = useSelector(store => store.showModal)

  const [downloadedAppData, setDownloadedAppData] = React.useState({
    isLoading: false,
    hasError: false,
    ingredients: [],
    defaultBun: {},
  });

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
    dispatch({type: CLOSE_MODAL})
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
        </p>}
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
            {showModal.visible && showModal.type === "ingredient" && modal(<IngredientDetails ingredient={showModal.ingredient}/>)}
          </main>
        </>
      }
    </div>
  )
}

export default App;
