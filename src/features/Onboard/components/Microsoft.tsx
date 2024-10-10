import "./Microsoft.scss";

import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as OpenInNewSVG } from "../../../assets/open_in_new.svg";
import placeholderProfileImage from "../../../assets/placeholder-picture.png";
import { useSignInWithMicrosoft } from "../../../hooks/FirebaseAuth/FirebaseAuth";
import { useAppDispatch } from "../../../hooks/hooks";
import { store } from "../../../store/store";
import { cardTransition } from "../../../utils/cardTransition";
import { CardWrapper } from "./CardWrapper";
import { setFirstTransition } from "./cardWrapperSlice";

interface MicrosoftProps {
  onFinish: () => void;
}

export const Microsoft = ({ onFinish }: MicrosoftProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAccountConfirmed, setIsAccountConfirmed] = useState(false);
  const [isInviteLinkedClicked, setIsInviteLinkedClicked] = useState(false);
  const [isLinkingConfirmed, setIsLinkingConfirmed] = useState(false);

  // This is just for frontend to show that it was not successful
  const [isInviteSuccessful, setIsInviteSuccessful] = useState(true);
  const [isRepositoryPrivate, setIsRepositoryPrivate] = useState(true);

  const [inviteLink, setInviteLink] = useState<string>("");
  const microsoftAuth = useSignInWithMicrosoft();

  const dispatch = useAppDispatch();
  const transitionPart = useCallback(cardTransition(), []);

  const getInviteLink = async () => {
    // TODO add axios call
    let res;
    if (store.getState().developmentMode.isMockMode) {
      res = await {
        data: {
          inviteLink: "https://microsoft.com",
          isPrivateRepository: true,
        },
      };
    } else {
      // axios call
    }

    setInviteLink(res!.data.inviteLink);
    setIsRepositoryPrivate(res!.data.isPrivateRepository);
  };

  const checkAcceptedInvite = async () => {
    if (!isRepositoryPrivate) {
      return true;
    }

    const res = await {
      data: {
        accepted: true,
      },
    };

    return res.data.accepted;
  };

  useEffect(() => {
    if (microsoftAuth.user !== null) {
      transitionPart(() => setIsAuthenticated(true));
    }
  }, [microsoftAuth.user]);

  useEffect(() => {
    dispatch(setFirstTransition());
  }, []);

  return (
    <CardWrapper delayShow={1000}>
      <div className="microsoft-component">
        <div className="flex-between">
          <h1 className="microsoft-text">Microsoft Teams</h1>

          {isAuthenticated && microsoftAuth.user && (
            <div className="flex-row">
              <p className="microsoft-profile-username">
                {microsoftAuth.user.user.displayName ?? microsoftAuth.user.user.email}
              </p>
              <img
                src={microsoftAuth.user.user.photoURL ?? placeholderProfileImage}
                className="microsoft-profile-img"
              ></img>
            </div>
          )}
        </div>

        {!isAuthenticated && (
          <>
            <p className="microsoft-component-subtext">{"Let's link your Microsoft account"}</p>
            <div className="flex-end">
              <button className="standard-button" onClick={async () => await microsoftAuth.signIn()}>
                Link your Microsoft account
              </button>
            </div>
          </>
        )}

        {isAuthenticated && !isAccountConfirmed && microsoftAuth.user && (
          <>
            <p className="microsoft-component-subtext">
              {`You've signed in as ${microsoftAuth.user.user.displayName ?? microsoftAuth.user.user.email}. Is that correct?`}
            </p>
            <div className="flex-between">
              <button
                className="standard-button secondary-btn"
                onClick={() => transitionPart(() => setIsAuthenticated(false))}
              >
                Change Account
              </button>

              <button
                className="standard-button"
                onClick={async () => {
                  await getInviteLink();
                  transitionPart(() => setIsAccountConfirmed(true));
                }}
              >
                {"Yup, that's me!"}
              </button>
            </div>
          </>
        )}

        {!isLinkingConfirmed && isAccountConfirmed && (
          <>
            <p className="microsoft-component-subtext">
              {"Alright, we've sent an invite link for Teams. Click the invite link below to accept it.\n" +
                (!isInviteSuccessful ? "Hmmm, it seems like you haven't accepted it yet. Could you try again?" : " ")}
            </p>
            <div className="flex-between">
              <Link to={inviteLink} target="_blank" rel="noopener noreferrer">
                <button
                  className="standard-button secondary-btn flex-row"
                  onClick={() => {
                    setIsInviteSuccessful(true);
                    setTimeout(() => setIsInviteLinkedClicked(true), 1000);
                  }}
                >
                  <span style={{ margin: "auto" }}>Accept Invite</span>
                  <OpenInNewSVG fill="#222" style={{ paddingLeft: "8px" }} />
                </button>
              </Link>

              {isInviteLinkedClicked && (
                <button
                  className="standard-button"
                  onClick={async () => {
                    if (await checkAcceptedInvite()) {
                      transitionPart(() => setIsLinkingConfirmed(true));
                    } else {
                      setIsInviteSuccessful(false);
                    }
                  }}
                >
                  {"I've accepted it!"}
                </button>
              )}
            </div>
          </>
        )}

        {isLinkingConfirmed && (
          <>
            <p className="microsoft-component-subtext">All looks in order! Shall we continue?</p>
            <div className="flex-end">
              <button className="standard-button" onClick={() => transitionPart(onFinish, true)}>
                {"Let's Go"}
              </button>
            </div>
          </>
        )}
      </div>
    </CardWrapper>
  );
};
