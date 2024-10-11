import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import variables from "./CardWrapper.module.scss";
import styles from "./CardWrapper.module.scss";
import { setTransition, TransitionStage } from "./cardWrapperSlice";

interface CardWrapperBGCheckProps {
  children: React.ReactNode;
  hasBackground: boolean;
}
interface CardWrapperProps {
  children?: React.ReactNode;
  delayShow?: number;
  hasBackground?: boolean;
  noBackgroundHasBorder?: boolean;
}

const CardWrapperBGCheck = ({ children, hasBackground }: CardWrapperBGCheckProps) => {
  return hasBackground ? children : <div style={{ width: "fit-content", margin: "auto" }}>{children}</div>;
};

export const CardWrapper = ({
  children,
  delayShow,
  hasBackground = true,
  noBackgroundHasBorder = true,
}: CardWrapperProps) => {
  const transitionStage: TransitionStage = useAppSelector((state) => state.cardWrapper.transition);
  const [isShown, setIsShown] = useState(delayShow ? false : true);
  const dispatch = useAppDispatch();

  if (hasBackground) {
    noBackgroundHasBorder = true;
  }

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
    <CardWrapperBGCheck hasBackground={hasBackground}>
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
                  : " ") +
          (!hasBackground ? " " + styles.cardWrapperNoBackground : " " + styles.cardWrapperWithBackground) +
          (!hasBackground && !noBackgroundHasBorder ? " " + styles.cardWrapperNoSideBorder : "")
        }
      >
        {children}
      </div>
    </CardWrapperBGCheck>
  ) : (
    <></>
  );
};
