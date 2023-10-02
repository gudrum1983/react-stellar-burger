import styles from "./constructor-list.module.css";
import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {selectedOtherIngredientsPropType} from "../../../utils/prop-types";
import { useDispatch } from 'react-redux';
import {DELETE_FILLING} from "../../../services/actions/burger-constructor";


function ConstructorList({filling}) {

  const dispatch = useDispatch();

  function deleteCard(idItem) {
    dispatch({type: DELETE_FILLING, id: idItem})
  }

  return (
    <div className={`${styles.listScroll} ${styles.scroll} custom-scroll`}>
      {filling.map((item) => (
        <React.Fragment key={item.numberIngredient}>
          <div className={styles.elementConstructor}>
            <DragIcon type="primary"/>
            <ConstructorElement
              extraClass='cursor'
              text={item.ingredient.name}
              price={item.ingredient.price}
              thumbnail={item.ingredient.image}
              handleClose={(e) => {
                deleteCard(item.numberIngredient, e)
              }}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

ConstructorList.propTypes = {
  filling: selectedOtherIngredientsPropType,
};

export {
  ConstructorList
}