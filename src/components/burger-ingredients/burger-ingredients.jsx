import React from "react";
import styles from "./burger-ingredients.module.css";
import stylesConstr from "../burger-constructor/burger-constructor.module.css";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import {CardList} from "../card-list/card-list";



function BurgerIngredients({data, setSelectedIngredients, selectedIngredients}) {

  const sortedData = data.toSorted(function (a, b) {
    if (a._id > b._id) {
      return 1;
    }
    if (a._id < b._id) {
      return -1;
    }
    return 0;
  });

  const sauces = sortedData.filter((item) => item.type === "sauce");
  const buns = sortedData.filter((item) => item.type === "bun");
  const mains = sortedData.filter((item) => item.type === "main")

  const [current, setCurrent] = React.useState('one');

  return (
    <section className={`pl-5 pr-5 ${styles.sectionClass}`}>
      <p className="text text_type_main-large mb-5 pt-10">Соберите&nbsp;бургер</p>
      <div style={{display: 'flex'}} className={`pb-10`}>
        <a href="#buns" className={styles.nonLink}>
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a href="#sauces" className={styles.nonLink}>
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a href="#mains" className={styles.nonLink}>
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>
      <div className={`${styles.ingredients} ${stylesConstr.scroll} custom-scroll`}>
        <div className={styles.typePart}>
          <p id="buns" className="text text_type_main-medium">Булки</p>
          <CardList data={buns} setSelectedIngredients={setSelectedIngredients}
                    selectedIngredients={selectedIngredients}/>
        </div>
        <div className={styles.typePart}>
          <p id="sauces" className="text text_type_main-medium">Соусы</p>
          <CardList data={sauces} setSelectedIngredients={setSelectedIngredients}
                     selectedIngredients={selectedIngredients}/>
        </div>
        <div className={styles.typePart}>
          <p id="mains" className="text text_type_main-medium">Начинки</p>
          <CardList data={mains} setSelectedIngredients={setSelectedIngredients}
                     selectedIngredients={selectedIngredients}/>
        </div>
      </div>
    </section>
  );
}

export {
  BurgerIngredients
}

