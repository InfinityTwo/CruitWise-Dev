import "./Onboard.scss";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ActiveTypes, Header } from "../../components/Header/Header";
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

export const Onboard = () => {
  // Page States
  const [onboardPlan, setOnboardPlan] = useState<OnboardPlanType>({
    steps: [],
    roleArray: [],
    name: "",
    onboardingProgressStage: 0,
  });
  const [params] = useSearchParams();

  const incrementOnboardingStage = () => {
    setOnboardPlan((prev) => ({
      ...prev,
      onboardingProgressStage: prev.onboardingProgressStage + 1,
    }));
  };

  const shouldDisplayComponent = (type: OnboardingTypes) => {
    return (
      onboardPlan.onboardingProgressStage >= 1 &&
      onboardPlan.onboardingProgressStage <= onboardPlan.steps.length &&
      onboardPlan.steps[onboardPlan.onboardingProgressStage - 1].type === type
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
    }
  };

  useEffect(() => {
    getOnboardPlan();
  }, []);

  return (
    <div className="body">
      <div className="main-view-container">
        <Header linkArray={onboardPlan.roleArray} activeTab={ActiveTypes.ONBOARD} />

        <div className="main-view-container-body">
          {onboardPlan.onboardingProgressStage >= 1 && (
            <ProgressBar
              onFinish={() => {}}
              progress={(onboardPlan.onboardingProgressStage - 1) / onboardPlan.steps.length}
            />
          )}
          {onboardPlan.onboardingProgressStage >= 1 && (
            <h1 className="onboarding-step">Step {onboardPlan.onboardingProgressStage}</h1>
          )}

          <div>
            {onboardPlan.onboardingProgressStage === 0 && (
              <Welcome
                company={onboardPlan.roleArray[0]}
                role={onboardPlan.roleArray[1]}
                personName={onboardPlan.name}
                onFinish={() => incrementOnboardingStage()}
                stepsCounter={onboardPlan.steps.length}
              />
            )}

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
