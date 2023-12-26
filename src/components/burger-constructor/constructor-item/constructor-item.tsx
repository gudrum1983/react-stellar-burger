import styles from "../constructor-item/constructor-item.module.css";
import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  deleteFilling,
  TBurgerConstructorOtherIngredient
} from "../../../services/burger-constructor/burger-constructor-actions";
import {useDrag, useDrop} from "react-dnd";
import {selectBurgerConstructor} from "../../../services/burger-constructor/burger-constructor-selector";
import {TIngredient} from "../../../utils/types";
import {useDispatch2, useSelector2} from "../../../services/store";
import {Identifier} from "dnd-core";

export type TSelectedIngredientOther = {
  ingredient: TIngredient;
  numberIngredient: string;
}


export type Ttestttt = {
  dragIndex: number,
  hoverIndex: number,
  other: Array<TBurgerConstructorOtherIngredient>
}


type TConstructorItem = {
  moveCard: (dragIndex: number, hoverIndex: number, other: Array<TBurgerConstructorOtherIngredient>) => void;
  index: number;
  id: string;
  currentItem: TSelectedIngredientOther;
};

type TDragObject = {
  id: string,
  index: number
}

type TDragCollectedProps = {
  isDragging: boolean,
  cursor: string
}

type TDropCollectedProps = {
  handlerId: Identifier | null,
}

export function ConstructorItem({moveCard, index, id, currentItem}: TConstructorItem): JSX.Element {
  const dispatch = useDispatch2();
  const {other} = useSelector2(selectBurgerConstructor)

  function deleteCard(idItem: string) {
    dispatch(deleteFilling(idItem))
  }

  const ref = React.useRef<HTMLDivElement>(null)

  const [{handlerId}, drop] = useDrop<TDragObject,unknown,TDropCollectedProps>({
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
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top
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
  const [{isDragging, cursor}, drag] = useDrag<TDragObject,unknown,TDragCollectedProps>({
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