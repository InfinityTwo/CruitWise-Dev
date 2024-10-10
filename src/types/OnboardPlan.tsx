export enum OnboardingTypes {
  GITHUB = "github",
  MS_TEAMS = "msteams",
  ENTER_DETAILS = "enter-details",
  VISIT_LINK = "visit-link",
  VIDEO = "video",
  MARKDOWN = "markdown",
  DRESS_CODE = "dress-code",
  PEOPLE_OF_INTEREST = "people-of-interest",
}

export interface OnboardPlanEachType {
  type: OnboardingTypes;
  links?: string[];
  linksName?: string[];
  link?: string;
  header?: string;
  img?: string;
  description?: string;
  organisationName?: string;
  isOrganisation?: boolean;
  repoName?: string;
  repoOwner?: string;
  itemList?: string[];
  people?: string[][][];
  markdown?: string;
}

export interface OnboardPlanType {
  steps: OnboardPlanEachType[];
  roleArray: string[];
  name: string;
  onboardingProgressStage: number;
}
