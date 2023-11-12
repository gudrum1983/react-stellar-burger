import React from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BurgerConstructor} from "../components/burger-constructor/burger-constructor";
import {BurgerIngredients} from "../components/burger-ingredients/burger-ingredients";

export function Home() {

  return (
    <div className={'flex-row'}>
      <DndProvider backend={HTML5Backend}>
        <section className={'pl-5 pr-5 half-home'}>
          <BurgerIngredients/>
        </section>
        <section className={'pl-5 pr-5 half-home'}>
          <BurgerConstructor/>
        </section>
      </DndProvider>
    </div>
  )
}