import { useCallback } from "react";

import variables from "../features/Onboard/components/CardWrapper.module.scss";
import {
  setEndTransition,
  setFirstTransition,
  setLastTransition,
  setStartTransition,
} from "../features/Onboard/components/cardWrapperSlice";
import { useAppDispatch } from "../hooks/hooks";

export const cardTransition = () => {
  const dispatch = useAppDispatch();

  const transitionPart = useCallback((then: () => void, isLast?: boolean, isLastButNoTimeout?: boolean) => {
    if (isLastButNoTimeout === undefined) {
      isLastButNoTimeout = false;
    }
    const timeoutEnd = () => {
      if (isLast) {
        dispatch(setFirstTransition());
      } else {
        dispatch(setStartTransition());
      }
      then();
    };

    dispatch(setEndTransition());

    setTimeout(
      () => {
        if (isLast && !isLastButNoTimeout) {
          dispatch(setLastTransition());
          setTimeout(
            () => {
              timeoutEnd();
            },
            1000 * parseFloat(variables.lastSlideOutDuration.replace("s", "")),
          );
        } else {
          timeoutEnd();
        }
      },
      1000 * parseFloat(variables.slideOutDuration.replace("s", "")),
    );
  }, []);

  return transitionPart;
};
