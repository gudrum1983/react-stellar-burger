import styles from "../constructor-item/constructor-item.module.css";
import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch} from 'react-redux';
import {deleteFilling} from "../../../services/burger-constructor/burger-constructor-actions";
import {useDrag, useDrop} from "react-dnd";
import {selectBurgerConstructor} from "../../../services/burger-constructor/burger-constructor-selector";
import {TIngredient} from "../../../utils/types";
import {useSelector2} from "../../../services/store";

export type TSelectedIngredientOther = {
  ingredient: TIngredient;
  numberIngredient: string;
}

type TConstructorItem = {
  moveCard: void;
  index: number;
  id: string;
  currentItem: TSelectedIngredientOther;
};



export function ConstructorItem({moveCard, index, id, currentItem}:TConstructorItem):JSX.Element {
  const dispatch = useDispatch();
  const {other} = useSelector2(selectBurgerConstructor)

  function deleteCard(idItem:string) {
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
      // @ts-ignore
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      // @ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      // @ts-ignore
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // @ts-ignore
      moveCard(dragIndex, hoverIndex, other)
      // @ts-ignore
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
        text={currentItem.ingredient.name}
        price={currentItem.ingredient.price}
        thumbnail={currentItem.ingredient.image}
        handleClose={() => {
          deleteCard(currentItem.numberIngredient)
        }}/>
    </div>
  )
}