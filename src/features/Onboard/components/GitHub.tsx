import "./GitHub.scss";

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as OpenInNewSVG } from "../../../assets/open_in_new.svg";
import placeholderProfileImage from "../../../assets/placeholder-picture.png";
import { useSignInWithGithub } from "../../../hooks/FirebaseAuth/FirebaseAuth";
import { useAppDispatch } from "../../../hooks/hooks";
import {
  checkMemberExistsOrg,
  checkMemberExistsRepo,
  inviteUserToOrg,
  inviteUserToRepo,
} from "../../../mocks/mockGithubBackend";
import { store } from "../../../store/store";
import { cardTransition } from "../../../utils/cardTransition";
import { CardWrapper } from "./CardWrapper";
import { setFirstTransition } from "./cardWrapperSlice";

interface GithubProps {
  onFinish: () => void;
  organisationName?: string;
  isOrganisation: boolean;
  repoName?: string;
  repoOwner?: string;
}

export const GitHub = ({ onFinish, organisationName, isOrganisation, repoName, repoOwner }: GithubProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAccountConfirmed, setIsAccountConfirmed] = useState(false);
  const [isInviteLinkedClicked, setIsInviteLinkedClicked] = useState(false);
  const [isLinkingConfirmed, setIsLinkingConfirmed] = useState(false);

  // This is just for frontend to show that it was not successful
  const [isInviteSuccessful, setIsInviteSuccessful] = useState(true);

  const [inviteLink, setInviteLink] = useState<string>("");
  const githubAuth = useSignInWithGithub();

  const dispatch = useAppDispatch();
  const transitionPart = useCallback(cardTransition(), []);

  const getInviteLink = async () => {
    // TODO add axios call
    let res;
    if (store.getState().developmentMode.isMockMode) {
      if (isOrganisation) {
        res = await inviteUserToOrg({
          email: githubAuth.user!.user.email!,
          orgName: organisationName!,
        });
      } else {
        res = await inviteUserToRepo({
          uid: githubAuth.user!.user.providerData[0].uid!,
          owner: repoOwner!,
          repoName: repoName!,
        });
      }
    } else {
      if (isOrganisation) {
        // axios call
        // res = axios
        //   .post("", {
        //     email: githubAuth.user!.user.email!,
        //     orgName: organisationName!,
        //   }, {})
        //   .then((result) => {res = result})
        //   .catch((err) => {});
      } else {
        // axios call
        // res = axios
        //   .post("", {
        //     uid: githubAuth.user!.user.providerData[0].uid!,
        //     owner: repoOwner!,
        //     repoName: repoName!,
        //   }, {})
        //   .then((result) => {res = result})
        //   .catch((err) => {});
      }
    }

    setInviteLink(
      isOrganisation
        ? "https://github.com/orgs/" + res!.data.inviteLink + "/invitation"
        : "https://github.com/" + res!.data.inviteLink + "/invitations",
    );
  };

  const checkAcceptedInvite = async () => {
    return isOrganisation
      ? await checkMemberExistsOrg({
          orgName: organisationName!,
          uid: githubAuth.user!.user.providerData[0].uid!,
          isOrganisation: isOrganisation,
        })
      : await checkMemberExistsRepo({
          owner: repoOwner!,
          uid: githubAuth.user!.user.providerData[0].uid!,
          repoName: repoName!,
        });
  };

  useEffect(() => {
    if (githubAuth.user !== null) {
      transitionPart(() => setIsAuthenticated(true));
    }
  }, [githubAuth.user]);

  useEffect(() => {
    dispatch(setFirstTransition());
  }, []);

  return (
    <CardWrapper delayShow={1000}>
      <div className="github-component">
        <div className="flex-between">
          <h1 className="github-text">GitHub</h1>

          {isAuthenticated && githubAuth.user && (
            <div className="flex-row">
              <p className="github-profile-username">
                {githubAuth.user.user.displayName ?? githubAuth.user.user.email}
              </p>
              <img src={githubAuth.user.user.photoURL ?? placeholderProfileImage} className="github-profile-img"></img>
            </div>
          )}
        </div>

        {!isAuthenticated && (
          <>
            <p className="github-component-subtext">{"Let's link your GitHub account"}</p>
            <div className="flex-end">
              <button className="standard-button" onClick={async () => await githubAuth.signIn()}>
                Link your Github account
              </button>
            </div>
          </>
        )}

        {isAuthenticated && !isAccountConfirmed && githubAuth.user && (
          <>
            <p className="github-component-subtext">
              {`You've signed in as ${githubAuth.user.user.displayName ?? githubAuth.user.user.email}. Is that correct?`}
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
            <p className="github-component-subtext">
              {"Alright, we've sent an invite link. Click the invite link below to accept it.\n" +
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
            <p className="github-component-subtext">All looks in order! Shall we continue?</p>
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
