import React from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from "../components/app/app.module.css";
import {BurgerConstructor} from "../components/burger-constructor/burger-constructor";
import {BurgerIngredients} from "../components/burger-ingredients/burger-ingredients";


export function OrderConstructor({handleDrop}) {

  return (
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
  )
}