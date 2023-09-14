import React from "react";
import styles from "./app.module.css";
import {AppHeader} from '../app-header/app-header'
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {Modal} from "../modal/modal";
import {ModalOrderDetails} from "../modal/order-details/order-details";
import {ModalIngredientDetails} from "../modal/ingredient-details/ingredient-details";


function App() {

  const url = "https://norma.nomoreparties.space/api/ingredients";

  React.useEffect(() => {
    getAppData();
  }, [])

  const [selectedIngredients, setSelectedIngredients] = React.useState({
    bun: {},
    other: [],
  });

  const [downloadedAppData, setDownloadedAppData] = React.useState({
    isLoading: false,
    hasError: false,
    ingredients: [],
    defaultBun: {},
  });

  const [showModal, setShowModal] = React.useState({
    visible: false,
    type: "",
    ingredient: {},
  });


  function findDefaultBun(ingredientsData) {
    if (ingredientsData) {
      const defaultBun = ingredientsData.find(item => item.type === "bun")
      setSelectedIngredients({
        ...selectedIngredients,
        bun: defaultBun,
      });
      return defaultBun
    } else {
      return {}
    }
  }

  const getAppData = () => {
    setDownloadedAppData({...downloadedAppData, hasError: false, isLoading: true});
    fetch(url)
      .then(res => res.json())
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
    setShowModal({
      visible: false,
      type: "",
      ingredient: {},
    })
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
      {isLoading && 'Загрузка..'}
      {hasError && 'Произошла ошибка'}
      {!isLoading &&
        !hasError &&
        ingredients.length &&
        <>
          <AppHeader/>
          <main className={styles.main}>
            <section className={`pl-5 pr-5 ${styles.sectionClass}`}>
              <BurgerIngredients ingredients={ingredients}
                                 selectedIngredients={selectedIngredients}
                                 setSelectedIngredients={setSelectedIngredients}
                                 setShowModal={setShowModal}/>
            </section>
            <section className={`pl-5 pr-5 ${styles.sectionClass}`}>
              <BurgerConstructor selectedIngredients={selectedIngredients}
                                 setSelectedIngredients={setSelectedIngredients}
                                 defaultBun={defaultBun}
                                 setShowModal={setShowModal}/>
            </section>
            {showModal.visible && showModal.type === "order" && modal(<ModalOrderDetails/>)}
            {showModal.visible && showModal.type === "ingredient" && !!(showModal.ingredient) && modal(
              <ModalIngredientDetails data={showModal.ingredient}/>)}
          </main>
        </>
      }
    </div>
  )
}

export default App;
