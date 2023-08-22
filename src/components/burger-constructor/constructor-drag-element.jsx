import styles from "./constructor-drag-element.module.css";
import { useDispatch } from "react-redux";
import {
  removeIngredient,
  moveIngredient,
} from "../../redux/slices/constructor-ingredients-slice";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

export const ConstructorDragElement = ({ objItem, idx }) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "innerIngredient",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIdx = item.idx;
      const hoverIdx = idx;

      if (dragIdx === hoverIdx) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIdx < hoverIdx && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIdx > hoverIdx && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(moveIngredient({ dragIdx, hoverIdx }));
      item.idx = hoverIdx;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "innerIngredient",
    item: () => {
      return { idx };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div className={styles.dragWrapper} style={{ opacity: opacity }} ref={ref}>
      <DragIcon />
      <ConstructorElement
        text={objItem.name}
        price={objItem.price}
        thumbnail={objItem.image}
        handleClose={() => {
          dispatch(removeIngredient(idx));
        }}
      />
    </div>
  );
};
