import "./MarkdownCard.scss";

import React, { useCallback } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cardTransition } from "../../../utils/cardTransition";
import { CardWrapper } from "./CardWrapper";

interface MarkdownCardProps {
  onFinish: () => void;
  header: string;
  markdown: string;
}

export const MarkdownCard = ({ onFinish, header, markdown }: MarkdownCardProps) => {
  const transitionPart = useCallback(cardTransition(), []);

  return (
    <CardWrapper delayShow={1000}>
      <div className="markdown-component flex-column">
        <h1 className="markdown-header">{header}</h1>
        <div>
          <Markdown remarkPlugins={[remarkGfm]} className="markdown-text">
            {markdown}
          </Markdown>
        </div>
        <button
          className="standard-button flex-end markdown-continue-btn"
          onClick={() => transitionPart(onFinish, true)}
        >
          Got it!
        </button>
      </div>
    </CardWrapper>
  );
};
