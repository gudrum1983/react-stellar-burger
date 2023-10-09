import styles from "../constructor-item/constructor-item.module.css";
import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {optionalFunc, optionalNum, optionalString, otherIngredient} from "../../../utils/prop-types";
import {useDispatch, useSelector} from 'react-redux';
import {deleteFilling} from "../../../services/burger-constructor/burger-constructor-actions";
import {useDrag, useDrop} from "react-dnd";
import {selectBurgerConstructor} from "../../../services/burger-constructor/burger-constructor-selector";

export function ConstructorItem({moveCard, index, id, item}) {
  const dispatch = useDispatch();
  const {other} = useSelector(selectBurgerConstructor)

  function deleteCard(idItem) {
    dispatch(deleteFilling(idItem))
  }

  const ref = React.useRef(null)
  const [{handlerId}, drop] = useDrop({
    accept: "move",
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
  const [{isDragging, cursor}, drag] = useDrag({
    type: "move",
    item: () => {
      return {id, index}
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      cursor: monitor.isDragging() ? 'grabbing' : 'grab'
    }),
  })
  const opacity = isDragging ? styles.hidden : styles.show
  drag(drop(ref))

  return (
    <div ref={ref} data-handler-id={handlerId} className={`${styles.elementConstructor} ${opacity}`} style={{cursor}}>
      <DragIcon type="primary"/>
      <ConstructorElement
        extraClass='cursor cursor_type_nresize'
        text={item.ingredient.name}
        price={item.ingredient.price}
        thumbnail={item.ingredient.image}
        handleClose={(e) => {
          deleteCard(item.numberIngredient, e)
        }}/>
    </div>
  )
}

ConstructorItem.propTypes = {
  moveCard: optionalFunc,
  index: optionalNum,
  id: optionalString,
  item: otherIngredient,
};