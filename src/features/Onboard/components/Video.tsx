import "./Video.scss";

import React, { useCallback } from "react";
import ReactPlayer from "react-player";

import { cardTransition } from "../../../utils/cardTransition";
import { CardWrapper } from "./CardWrapper";

interface VideoType {
  onFinish: () => void;
  videoURL: string;
  description?: string;
}

export const Video = ({ onFinish, videoURL, description }: VideoType) => {
  const [hasVideoEnded, setHasVideoEnded] = React.useState(false);
  const transitionPart = useCallback(cardTransition(), []);

  return (
    <CardWrapper delayShow={1000}>
      <div className="video-component flex-between">
        <div className="video-player">
          <ReactPlayer
            url={videoURL}
            width={"auto"}
            height={"auto"}
            style={{
              aspectRatio: 16 / 9,
              margin: "0.25em auto 0.5em auto",
              maxHeight: "45vh",
              boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.15)",
              outline: "none",
              border: "none",
              borderRadius: "15px",
            }}
            onEnded={() => setHasVideoEnded(true)}
          />
        </div>
        <div className="video-side">
          <h1 className="video-text">Video</h1>
          <p>{description}</p>
          <div className="video-continue-btn-wrapper">
            {hasVideoEnded && (
              <button
                className="standard-button flex-end video-continue-btn"
                onClick={() => {
                  if (hasVideoEnded) {
                    transitionPart(onFinish, true);
                  }
                }}
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};
