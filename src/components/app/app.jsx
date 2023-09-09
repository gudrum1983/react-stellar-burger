import styles from "./app.module.css";
import {data} from "../../utils/data";
import {AppHeader} from '../app-header/app-header'
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import React from "react";

function App() {

  const [composition, setComposition] = React.useState({
    bun: {},
    other: [],
  });


  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.Appmain}>
        <BurgerIngredients data={data} setComposition={setComposition} composition={composition}/>
        <BurgerConstructor composition={composition} setComposition={setComposition}/>
      </main>

    </div>
  );

}




export default App;
