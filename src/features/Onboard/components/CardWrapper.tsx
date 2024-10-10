import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import variables from "./CardWrapper.module.scss";
import styles from "./CardWrapper.module.scss";
import { setTransition, TransitionStage } from "./cardWrapperSlice";

interface CardWrapperProps {
  children?: React.ReactNode;
  delayShow?: number;
}

export const CardWrapper = ({ children, delayShow }: CardWrapperProps) => {
  const transitionStage: TransitionStage = useAppSelector((state) => state.cardWrapper.transition);
  const [isShown, setIsShown] = React.useState(delayShow ? false : true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (transitionStage === TransitionStage.BEGIN) {
      const timeout = setTimeout(
        () => {
          dispatch(setTransition(TransitionStage.NONE));
        },
        1000 *
          (parseFloat(variables.slideInDuration.replace("s", "")) +
            parseFloat(variables.slideOutDuration.replace("s", ""))) +
          (delayShow ? delayShow : 0),
      );
      return () => clearTimeout(timeout);
    } else if (transitionStage === TransitionStage.FIRST) {
      const timeout = setTimeout(
        () => {
          dispatch(setTransition(TransitionStage.BEGIN));
        },
        1000 * parseFloat(variables.firstSlideInDuration.replace("s", "")) + (delayShow ? delayShow : 0),
      );
      return () => clearTimeout(timeout);
    }
  }, [transitionStage, dispatch]);

  useEffect(() => {
    if (delayShow) {
      const timeout = setTimeout(() => {
        setIsShown(true);
      }, delayShow);
      return () => clearTimeout(timeout);
    }
  }, []);

  return isShown ? (
    <div
      className={
        styles.cardWrapper +
        (transitionStage === TransitionStage.BEGIN
          ? " " + styles.cardWrapperBegin
          : transitionStage === TransitionStage.END
            ? " " + styles.cardWrapperEnd
            : transitionStage === TransitionStage.LAST
              ? " " + styles.cardWrapperLast
              : transitionStage === TransitionStage.FIRST
                ? " " + styles.cardWrapperFirst
                : " ")
      }
    >
      {children}
    </div>
  ) : (
    <></>
  );
};
