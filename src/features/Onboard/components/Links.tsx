import "./Links.scss";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as OpenInNewSVG } from "../../../assets/open_in_new.svg";
import { cardTransition } from "../../../utils/cardTransition";
import { CardWrapper } from "./CardWrapper";

interface LinksProps {
  onFinish: () => void;
  header: string;
  description: string;
  imageName: string;
  links: string[];
  linksName: string[];
}

export const Links = ({ onFinish, header, description, imageName, links, linksName }: LinksProps) => {
  const transitionPart = useCallback(cardTransition(), []);
  const [isClicked, setIsClicked] = useState<boolean[]>([]);
  const [image, setImage] = useState("");
  const [clickableLinks, setClickableLinks] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fetchImage = async () => {
      if (
        !(
          imageName.includes("http://") ||
          imageName.includes("https://") ||
          imageName.includes("www.") ||
          imageName.includes(".com")
        )
      ) {
        const image = await import(`../../../assets/${imageName}.png`);
        setImage(image.default);
      } else {
        setImage(imageName);
      }
    };

    fetchImage();

    const newIsClicked: boolean[] = [];
    for (let i = 0; i < links.length; i++) {
      newIsClicked.push(false);
    }
    setIsClicked(newIsClicked);

    setClickableLinks(
      links.map((link, index) => {
        return (
          <Link
            className="flex-row link-clickable"
            to={link}
            onClick={() =>
              setTimeout(
                () =>
                  setIsClicked((prev) => {
                    const newClicked = [...prev];
                    newClicked[index] = true;
                    return newClicked;
                  }),
                1000,
              )
            }
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            {linksName[index]}
            <OpenInNewSVG fill="#222" style={{ paddingLeft: "8px" }} />
          </Link>
        );
      }),
    );
  }, []);

  return (
    <CardWrapper>
      <div className="link-component flex-column">
        <h1 className="link-header">{header}</h1>
        <Suspense>
          <img src={image} className="link-image" />
        </Suspense>
        <span className="link-desc">{description}</span>
        <div className="flex-row link-clickable-row">{clickableLinks}</div>
        <div className="link-continue-btn-wrapper">
          {isClicked.reduce((acc, current) => acc && current, true) && (
            <button
              className="standard-button flex-end link-continue-btn"
              onClick={() => transitionPart(onFinish, true)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};
