import React from "react";
import styles from "./app.module.css";
import {data} from "../../utils/data";
import {AppHeader} from '../app-header/app-header'
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";


function App() {
  const [selectedIngredients, setSelectedIngredients] = React.useState({
    bun: {},
    other: [],
  });

  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.main}>
        <section className={`pl-5 pr-5 ${styles.sectionClass}`}>
          <BurgerIngredients data={data}
                             selectedIngredients={selectedIngredients}
                             setSelectedIngredients={setSelectedIngredients}/>
        </section>
        <section className={`pl-5 pr-5 ${styles.sectionClass}`}>
          <BurgerConstructor selectedIngredients={selectedIngredients}
                             setSelectedIngredients={setSelectedIngredients}/>
        </section>
      </main>
    </div>
  );
}

export default App;
