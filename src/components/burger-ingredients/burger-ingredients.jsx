import React from "react";
import styles from "./burger-ingredients.module.css";
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'


const classes = {
  link: "pl-5 pr-5 pb-5 pt-5",
  panel: "pt-4 pb-4",
}

const Card = ({item, bullka}) => {

  const isCount = item.__v !== 0

  return (
    <div className={styles.card}>
      <img className={styles.imgCard} alt={item.name} src={item.image}/>
      <div className={`pt-1 pb-1 ${styles.price}`}>
        <p className="text text_type_digits-default pr-2">{item.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <div className={styles.cardName}>
        <p className="text text_type_main-default">{item.name}</p>
      </div>
      {isCount && <Counter count={item.__v} size="default" extraClass="m-1" />}
    </div>
  );
};


function TypeP(props) {
  return (
    <div className={`${styles.type} pt-6 pr-4 pl-4 pb-10`}>
      {props.data.map((item) => (
        <React.Fragment key={item._id}>
          <Card item={item} bullka={item.type === "bun"}/>
        </React.Fragment>
      ))}
    </div>
  )
}


function BurgerIngredients(props) {

  const sauces = props.data.filter((item) => item.type === "sauce");
  const buns = props.data.filter((item) => item.type === "bun");
  const mains = props.data.filter((item) => item.type === "main")

  const [current, setCurrent] = React.useState('one');
  return (
    <section className={`pl-5 pr-5 pt-10 pb-10 ${styles.sectionClass}`}>
      <p className="text text_type_main-large mb-5">Соберите&nbsp;бургер</p>
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
      <div className={`${styles.ingredients} custom-scroll`}>
        <div className={styles.typePart}>
          <p id="buns" className="text text_type_main-medium">Булки</p>
          <TypeP data={buns}/>
        </div>
        <div className={styles.typePart}>
          <p id="sauces" className="text text_type_main-medium">Соусы</p>
          <TypeP data={sauces}/>
        </div>
        <div className={styles.typePart}>
          <p id="mains" className="text text_type_main-medium">Начинки</p>
          <TypeP data={mains}/>
        </div>
      </div>

    </section>
  );
}

export {
  BurgerIngredients
}


{/*
<p><a name="top"></a></p>
<p>...</p>
<p><a href="#top">Наверх</a></p>*/
}
