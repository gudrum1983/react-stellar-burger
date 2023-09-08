import React from "react";
import {useEffect} from "react";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import stylesConstr from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {createConnect} from "react-redux/lib/connect/connect";

function BurgerConstructor({composition}) {

  console.log("888")


  /*  const buns = composition.bun
    const mains = composition.other*/

/*  const [current, setCurrent] = React.useState('one');*/
  return (
    <section className={`pl-5 pr-5 pt-25 pb-10 ${styles.sectionClass}`}>
      <div className={`pl-4 pr-4  ${stylesConstr.BurgerConstructor}`}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
        </div>

      </div>

    </section>
  );

  function revert() {
    const first = document.querySelector("constructor-element_pos_bottom");
    const second = first.querySelector("constructor-element__image");
    console.log(first)
    console.log(second)
    /*  .classList.add('revert')*/
  }

  revert()
}

export {
  BurgerConstructor
}