import "./Onboard.scss";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ActiveTypes, Header } from "../../components/Header/Header";
import { useWindowSize } from "../../hooks/hooks";
import { onboardData } from "../../mocks/mockOnboardData";
import { store } from "../../store/store";
import { OnboardingTypes, OnboardPlanType } from "../../types/OnboardPlan";
import { Contacts } from "./components/Contacts";
import { DressCode } from "./components/DressCode";
import { GitHub } from "./components/GitHub";
import { Links } from "./components/Links";
import { MarkdownCard } from "./components/MarkdownCard";
import { Microsoft } from "./components/Microsoft";
import { OnboardingComplete } from "./components/OnboardingComplete";
import { ProgressBar } from "./components/ProgressBar";
import { Video } from "./components/Video";
import { Welcome } from "./components/Welcome";

const OnboardBackground = () => {
  const [width, height] = useWindowSize();

  const eachDot = () => {
    return <div className="onboard-background-dot"></div>;
  };
  const rowDots = () => {
    const ROW_COUNT = Math.ceil(width / 45);
    const dots: JSX.Element[] = [];
    for (let i = 0; i < ROW_COUNT; i++) {
      dots.push(eachDot());
    }
    return <div className="onboard-background-dot-row flex-row">{dots}</div>;
  };

  const colDots = () => {
    const COL_COUNT = Math.ceil(height / 45);
    const dots: JSX.Element[] = [];
    for (let i = 0; i < COL_COUNT; i++) {
      dots.push(rowDots());
    }
    return <div className="onboard-background-dot-col flex-col">{dots}</div>;
  };

  return <div className="onboard-background-dots-wrapper">{colDots()}</div>;
};

export const Onboard = () => {
  // Page States
  const [onboardPlan, setOnboardPlan] = useState<OnboardPlanType>({
    steps: [],
    roleArray: [],
    name: "",
    onboardingProgressStage: 0,
  });
  const [isWelcomeComplete, setIsWelcomeComplete] = useState(false);
  const [isWelcomeCompleteDelayed, setIsWelcomeCompleteDelayed] = useState(false);
  // Refresh the cards in case it is back to back
  const [isAllCardsHiddenTemporarily, setIsAllCardsHiddenTemporarily] = useState(false);
  const [params] = useSearchParams();

  const incrementOnboardingStage = () => {
    setOnboardPlan((prev) => ({
      ...prev,
      onboardingProgressStage: prev.onboardingProgressStage + 1,
    }));
    setIsAllCardsHiddenTemporarily(true);
  };

  const shouldDisplayComponent = (type: OnboardingTypes) => {
    return (
      onboardPlan.onboardingProgressStage >= 1 &&
      onboardPlan.onboardingProgressStage <= onboardPlan.steps.length &&
      onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].type === type &&
      !isAllCardsHiddenTemporarily
    );
  };

  const getOnboardPlan = async () => {
    // TODO add axios call
    let res;
    if (params.get("uuid")) {
      if (store.getState().developmentMode.isMockMode) {
        res = await {
          data: onboardData,
        };
      } else {
        // axios call
        if (params.get("uuid")) {
          // res = await axios.post("", {}, { data: { uuid: params.get("uuid") } });
        }
      }

      const onboardPlan: OnboardPlanType = res!.data;
      setOnboardPlan(onboardPlan);
      if (onboardPlan.onboardingProgressStage !== 0) {
        setIsWelcomeComplete(true);
        setIsWelcomeCompleteDelayed(true);
      }
    }
  };

  useEffect(() => {
    getOnboardPlan();
  }, []);

  useEffect(() => {
    if (isAllCardsHiddenTemporarily) {
      setIsAllCardsHiddenTemporarily(false);
    }
  }, [isAllCardsHiddenTemporarily]);

  return (
    <div className="body">
      <OnboardBackground />
      <div className="main-view-container">
        {onboardPlan.onboardingProgressStage >= 1 && isWelcomeComplete && (
          <Header linkArray={onboardPlan.roleArray} activeTab={ActiveTypes.ONBOARD} toSlideIn={true} />
        )}

        {onboardPlan.onboardingProgressStage === 0 && (
          <Welcome
            company={onboardPlan.roleArray[0]}
            role={onboardPlan.roleArray[1]}
            personName={onboardPlan.name}
            onFinish={() => {
              incrementOnboardingStage();
              setTimeout(() => setIsWelcomeComplete(true), 500);
              setTimeout(() => setIsWelcomeCompleteDelayed(true), 1250);
            }}
            stepsCounter={onboardPlan.steps.length}
          />
        )}

        <div className="main-view-container-body">
          {isWelcomeCompleteDelayed && onboardPlan.onboardingProgressStage >= 1 && (
            <ProgressBar progress={(onboardPlan.onboardingProgressStage - 1) / onboardPlan.steps.length} />
          )}

          {isWelcomeCompleteDelayed && onboardPlan.onboardingProgressStage >= 1 && (
            <h1 className="onboarding-step">
              {onboardPlan.onboardingProgressStage <= onboardPlan.steps.length
                ? "Step " + String(onboardPlan.onboardingProgressStage)
                : ""}
            </h1>
          )}

          <div>
            {shouldDisplayComponent(OnboardingTypes.GITHUB) && (
              <GitHub
                onFinish={() => incrementOnboardingStage()}
                organisationName={onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].organisationName}
                isOrganisation={onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].isOrganisation!}
                repoName={onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].repoName}
                repoOwner={onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].repoOwner}
              />
            )}

            {shouldDisplayComponent(OnboardingTypes.MS_TEAMS) && (
              <Microsoft onFinish={() => incrementOnboardingStage()} />
            )}

            {shouldDisplayComponent(OnboardingTypes.VIDEO) && (
              <Video
                onFinish={() => incrementOnboardingStage()}
                videoURL={onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].link!}
                description={onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].description}
              />
            )}

            {shouldDisplayComponent(OnboardingTypes.DRESS_CODE) && (
              <DressCode
                onFinish={() => incrementOnboardingStage()}
                dressCodes={onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].itemList!}
              />
            )}

            {shouldDisplayComponent(OnboardingTypes.VISIT_LINK) && (
              <Links
                onFinish={() => incrementOnboardingStage()}
                header={onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].header!}
                description={onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].description!}
                imageName={onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].img!}
                links={onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].links!}
                linksName={onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].linksName!}
              />
            )}

            {shouldDisplayComponent(OnboardingTypes.PEOPLE_OF_INTEREST) && (
              <Contacts
                onFinish={() => incrementOnboardingStage()}
                contacts={onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].people!}
              />
            )}

            {shouldDisplayComponent(OnboardingTypes.MARKDOWN) && (
              <MarkdownCard
                onFinish={() => incrementOnboardingStage()}
                header={onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].header!}
                markdown={onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].markdown!}
              />
            )}

            {onboardPlan.onboardingProgressStage > onboardPlan.steps.length && (
              <OnboardingComplete company={onboardPlan.roleArray[0]} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
