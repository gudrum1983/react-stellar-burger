import styles from "./app.module.css";
import {data} from "../../utils/data";
import {AppHeader} from '../app-header/app-header'
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import React from "react";

function App() {

  console.log("777")


  const [composition, setComposition] = React.useState({
    bun: {},
    other: [],
  });


  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.Appmain}>
        <BurgerIngredients data={data} setComposition={setComposition} composition={composition}/>
        <BurgerConstructor composition={composition}/>
      </main>

    </div>
  );

}




export default App;
