import React from "react";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import stylesConstr from "../burger-constructor/burger-constructor.module.css";
/*import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";*/

function BurgerConstructor({composition}) {

/*  const buns = composition.bun
  const mains = composition.other*/

/*  const [current, setCurrent] = React.useState('one');*/
  return (
    <section className={`pl-5 pr-5 pt-10 pb-10 ${styles.sectionClass}`}>
      <p className="text text_type_main-large mb-5">Соберите&nbsp;бургер</p>

      <div className={stylesConstr.BurgerConstructor}> vbcgngn
      </div>

    </section>
  );
}

export {
  BurgerConstructor
}