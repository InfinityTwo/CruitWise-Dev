import "./Welcome.scss";

import React, { useCallback, useState } from "react";

import { cardTransition } from "../../../utils/cardTransition";
import { CardWrapper } from "./CardWrapper";

interface WelcomeProps {
  company: string;
  personName: string;
  role: string;
  onFinish: () => void;
  stepsCounter: number;
}

interface WelcomePartProps {
  blackText: string;
  coloredText: string;
  buttonText?: string;
  onClick: () => void;
  isLastPart?: boolean;
}

const vowels = ["a", "e", "i", "o", "u"];

const WelcomePart = ({ blackText, coloredText, buttonText = "Next", onClick }: WelcomePartProps) => {
  const transitionPart = useCallback(cardTransition(), []);

  const handleClick = () => {
    transitionPart(onClick, true, true);
  };

  return (
    <div className="welcome-part-wrapper">
      <div className="welcome-part">
        <CardWrapper hasBackground={false} delayShow={250}>
          <p className="welcome-part-text">
            {blackText}
            <span>{coloredText}</span>
          </p>
        </CardWrapper>
        <CardWrapper hasBackground={false} noBackgroundHasBorder={false} delayShow={250}>
          <button className="welcome-part-button" onClick={handleClick}>
            <p>{buttonText}</p>
          </button>
        </CardWrapper>
      </div>
    </div>
  );
};

export const Welcome = ({ company, personName, role, onFinish, stepsCounter }: WelcomeProps) => {
  const [welcomeStage, setWelcomeStage] = useState(0);

  return (
    <div>
      <div className="welcome-component">
        {welcomeStage === 0 && (
          <WelcomePart
            blackText="Hi "
            coloredText={personName}
            buttonText="Hi! 👋"
            onClick={() => setWelcomeStage(1)}
          />
        )}
        {welcomeStage === 1 && (
          <WelcomePart
            blackText={company === "cruitwise" ? "Welcome to cruit" : "Welcome to "}
            coloredText={company === "cruitwise" ? "wise" : company}
            buttonText="Thank You!"
            onClick={() => setWelcomeStage(2)}
          />
        )}
        {welcomeStage === 2 && (
          <WelcomePart
            blackText={
              vowels.includes(role.charAt(0)) ? "Let's get you Onboarded as an " : "Let's get you Onboarded as a "
            }
            coloredText={role}
            buttonText="Okay"
            onClick={() => setWelcomeStage(3)}
          />
        )}
        {welcomeStage === 3 && (
          <WelcomePart
            blackText={`Complete all ${stepsCounter} steps before your `}
            coloredText={"first day"}
            buttonText="Let's Go!"
            onClick={() => onFinish()}
          />
        )}
      </div>
    </div>
  );
};
