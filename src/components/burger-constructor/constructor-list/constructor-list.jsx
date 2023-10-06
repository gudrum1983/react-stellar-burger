import styles from "./constructor-list.module.css";
import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {selectedOtherIngredientsPropType} from "../../../utils/prop-types";
import {useDispatch, useSelector} from 'react-redux';
import { deleteFilling, moveFilling} from "../../../services/burger-constructor/burger-constructor-actions";
import {useDrag, useDrop} from "react-dnd";
import update from 'immutability-helper'
import {chooseIngredients} from "../../../services/burger-constructor/burger-constructor-selector";

const ItemTypes = "moveItem"

function NewCard({moveCard, index, id, item}) {
  const dispatch = useDispatch();
  const {other} = useSelector(chooseIngredients)

  function deleteCard(idItem) {
    dispatch(deleteFilling(idItem))
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
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex, other)
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

  const {bun, other} = useSelector(chooseIngredients)
  const dispatch = useDispatch();
  const topGap = !bun ? styles.topGap : '';
  const moveCard = React.useCallback((dragIndex, hoverIndex, other) => {

    const test = update(other, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, other[dragIndex]],
      ],
    })

    dispatch(moveFilling(test)
    )
  }, [])


  return (
    <div className={`${styles.listScroll} ${styles.scroll} ${topGap} custom-scroll`}>
      {other.map((item, i) => (
        <NewCard moveCard={moveCard} index={i} key={item.numberIngredient} id={item.numberIngredient} item={item}>

        </NewCard>
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