import styles from "./constructor-list.module.css";
import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {selectedOtherIngredientsPropType} from "../../../utils/prop-types";
import {ShowModalContext} from "../../../services/modalContext";
import { useDispatch } from 'react-redux';
import {DELETE_FILLING} from "../../../services/actions/choose-ingredients";


function ConstructorList({filling}) {

  //const {selectedIngredients, selectedIngredientsDispatcher} = React.useContext(SelectedIngredientsContext);

  const dispatch = useDispatch();

  const { showModalDispatcher } = React.useContext(ShowModalContext);
  function deleteCard(idItem) {
    dispatch({type: DELETE_FILLING, id: idItem})
  }

  function showItemDetails(item, e) {
    const action = e.nativeEvent.target.closest(".constructor-element__action")
    if (!action) {
      showModalDispatcher({type: 'open', payload: {type: "ingredient", ingredient: item.ingredient}})
    }
  }

  return (
    <div className={`${styles.listScroll} ${styles.scroll} custom-scroll`}>
      {filling.map((item) => (
        <React.Fragment key={item.numberIngredient}>
          <div className={styles.elementConstructor} onClick={(e) => {
            showItemDetails(item, e)
          }}>
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