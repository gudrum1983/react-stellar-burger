import React from "react";
import styles from "./app.module.css";
import {dataS} from "../../utils/data";
import {AppHeader} from '../app-header/app-header'
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import {Modal} from "../modal/modal";
import {ModalOrderDetails} from "../modal/order-details/order-details";
import {ModalIngredientDetails} from "../modal/ingredient-details/ingredient-details";


function App() {

  const url = "https://norma.nomoreparties.space/api/ingredients";

  React.useEffect(() => {
    getFilms();

  }, [])

  const [selectedIngredients, setSelectedIngredients] = React.useState({
    bun: {},
    other: [],
  });

  const [stateApp, setStateApp] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
    defaultBun: {},
  });

  const [showModal, setShowModal] = React.useState({
    visible: false,
    type: "",
    ingredient: {},
  });


  function check(datat) {
    if (datat) {
      const defaultBun = datat.find(item => item.type === "bun")
      setSelectedIngredients({
        ...selectedIngredients,
        bun: defaultBun,
      });
      return defaultBun
    } else {
      return {}
    }
  }

  const getFilms = () => {
    setStateApp({...stateApp, hasError: false, isLoading: true});
    fetch(url)
      .then(res => res.json())
      .then(data => data.data)
      .then(data => setStateApp({...stateApp, data: sortedData(data), isLoading: false, defaultBun: check(data),}))
      .catch(e => {
        setStateApp({...stateApp, hasError: true, isLoading: false});
      });
  };

  const {data, isLoading, hasError, defaultBun} = stateApp;

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
    setShowModal({visible: false})
  };


  function modal(comnonent) {
    let header = "";

    if (showModal.type !== "order") {
      header = "Детали ингредиента";
    }


  return(

  <Modal onClose={handleCloseModal} header={header}>
    {comnonent}
  </Modal>)
};


  return (
    <div className={`text text_type_main-default ${styles.app}`}>
      {isLoading && <Logo/>}
      {hasError && 'Произошла ошибка'}
      {!isLoading &&
        !hasError &&
        data.length &&
        <>        <AppHeader />
          <main className={styles.main}>
            <section className={`pl-5 pr-5 ${styles.sectionClass}`}>
              <BurgerIngredients data={data}
                                 selectedIngredients={selectedIngredients}
                                 setSelectedIngredients={setSelectedIngredients}/>
            </section>
            <section className={`pl-5 pr-5 ${styles.sectionClass}`}>
              <BurgerConstructor selectedIngredients={selectedIngredients}
                                 setSelectedIngredients={setSelectedIngredients}
                                 defaultBun={defaultBun}
                                 setShowModal={setShowModal}/>
            </section>
            {showModal.visible && showModal.type === "order" && modal(<ModalOrderDetails/>)}
            {showModal.visible && showModal.type === "ingredient" && !!(showModal.ingredient) && modal(<ModalIngredientDetails data={showModal.ingredient}/>)}

          </main>
        </>

      }

    </div>
  )
}

export default App;
