import styles from "./constructor-drag-element.module.css";
import {
  removeIngredient,
  moveIngredient,
} from "../../redux/slices/constructor-ingredients-slice";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { FC, useRef } from "react";
import { IIngredient } from "../../utils/types";
import { useAppDispatch } from "../../utils/hooks/use-app-dispatch";

interface IConstructorDragElement {
  objItem: IIngredient;
  idx: number;
}

const ConstructorDragElement: FC<IConstructorDragElement> = ({
  objItem,
  idx,
}) => {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "innerIngredient",
    hover: (item: { idx: number }, monitor) => {
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
      const clientOffset: any = monitor.getClientOffset();
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
      <DragIcon type="secondary" />
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

export default ConstructorDragElement;
