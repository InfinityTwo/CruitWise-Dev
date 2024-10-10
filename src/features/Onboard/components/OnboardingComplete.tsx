import "./OnboardingComplete.scss";

import React, { useCallback, useEffect } from "react";

import { useAppDispatch } from "../../../hooks/hooks";
import { cardTransition } from "../../../utils/cardTransition";
import { CardWrapper } from "./CardWrapper";
import { setFirstTransition } from "./cardWrapperSlice";

interface OnboardingCompleteProps {
  company: string;
}

export const OnboardingComplete = ({ company }: OnboardingCompleteProps) => {
  const dispatch = useAppDispatch();
  const transitionPart = useCallback(cardTransition(), []);

  useEffect(() => {
    dispatch(setFirstTransition());
  }, []);

  return (
    <CardWrapper delayShow={1000}>
      <div className="onboarding-complete-component">
        <h1>{"That's it for Onboarding"}</h1>
        <span>{`Welcome to ${company}`}</span>
      </div>
    </CardWrapper>
  );
};
