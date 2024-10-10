import "./DressCode.scss";

import React, { useCallback, useEffect, useState } from "react";

import { ReactComponent as ShirtSVG } from "../../../assets/shirt.svg";
import { cardTransition } from "../../../utils/cardTransition";
import { CardWrapper } from "./CardWrapper";

interface DressCodeProps {
  onFinish: () => void;
  dressCodes: string[];
}

export const DressCode = ({ onFinish, dressCodes }: DressCodeProps) => {
  const transitionPart = useCallback(cardTransition(), []);
  const [dressCodesJSXList, setDressCodeJSXList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setDressCodeJSXList(
      dressCodes.map((code, index) => (
        <div key={index} className="dress-code-item">
          {code}
        </div>
      )),
    );
  }, []);

  return (
    <CardWrapper>
      <div className="dress-code-component flex-column">
        <h1 className="dress-code-name">Dress Code</h1>
        <ShirtSVG className="dress-code-svg" />
        <span className="dress-code-desc">{"Here's what we want you to wear to our office"}</span>
        <div className="flex-row dress-codes">{dressCodesJSXList}</div>
        <button className="standard-button flex-end dress-continue-btn" onClick={() => transitionPart(onFinish, true)}>
          Got it!
        </button>
      </div>
    </CardWrapper>
  );
};
