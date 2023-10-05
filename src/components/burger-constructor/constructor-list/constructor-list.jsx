import styles from "./constructor-list.module.css";
import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {selectedOtherIngredientsPropType} from "../../../utils/prop-types";
import {useDispatch, useSelector} from 'react-redux';
import {DELETE_FILLING, MOVE_FILLING} from "../../../services/actions/burger-constructor";
import {useDrag, useDrop} from "react-dnd";
import update from 'immutability-helper'
const ItemTypes = "moveItem"

function NewCard({moveCard, index, id, item}) {
  const dispatch = useDispatch();
  const otherTest = useSelector(store => store.chooseIngredients.other)
/*  debugger*/
/*  console.log("otherTestNew", otherTest)*/

  function deleteCard(idItem) {
    dispatch({type: DELETE_FILLING, id: idItem})
  }

  const ref = React.useRef(null)
  const [{handlerId}, drop] = useDrop({
    accept: ItemTypes,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex, otherTest)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{isDragging}, drag] = useDrag({
    type: ItemTypes,
    item: () => {
      return {id, index}
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? styles.opacity0 : styles.opacity1
  drag(drop(ref))


  return (<div ref={ref} data-handler-id={handlerId} className={`${styles.elementConstructor} ${opacity}`}>
      <DragIcon type="primary"/>
      <ConstructorElement
        extraClass='cursor cursor_type_nresize'
        text={item.ingredient.name}
        price={item.ingredient.price}
        thumbnail={item.ingredient.image}
        handleClose={(e) => {
          deleteCard(item.numberIngredient, e)
        }}
      /></div>
  )
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
function ConstructorList() {

  const {other} = useSelector(store => store.chooseIngredients)
/*  console.log("other",other)*/
  const dispatch = useDispatch();

  const moveCard = React.useCallback((dragIndex, hoverIndex, otherTest) => {

    const test = update(otherTest, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, otherTest[dragIndex]],
      ],
    })
/*    console.log(test)*/

    dispatch({
      type: MOVE_FILLING,
      payload: test,
    })
  }, [])


  return (
    <div className={`${styles.listScroll} ${styles.scroll} custom-scroll`}>
      {other.map((item, i) => (
        /*        <React.Fragment moveCard={moveCard} index={i} key={item.numberIngredient}>*/
        <NewCard moveCard={moveCard} index={i} key={item.numberIngredient}  id={item.numberIngredient} item={item}>

        </NewCard>
        /*        </React.Fragment>*/
      ))}
    </div>
  )
}

ConstructorList.propTypes = {
  other: selectedOtherIngredientsPropType,
};

export {
  ConstructorList
}