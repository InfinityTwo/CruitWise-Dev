import { OnboardingTypes, OnboardPlanType } from "../types/OnboardPlan";

export const onboardData: OnboardPlanType = {
  steps: [
    {
      type: OnboardingTypes.GITHUB, // 1
      organisationName: process.env.REACT_APP_MOCK_GITHUB_ORG,
      isOrganisation: true,
    },
    {
      type: OnboardingTypes.GITHUB, // 2
      repoName: process.env.REACT_APP_GITHUB_PERSONAL_REPO_NAME,
      repoOwner: process.env.REACT_APP_GITHUB_PERSONAL_REPO_OWNER,
      isOrganisation: false,
    },
    {
      type: OnboardingTypes.MS_TEAMS, // 3
    },
    {
      type: OnboardingTypes.VIDEO, // 4
      link: "https://www.youtube.com/watch?v=wBz_5SVnB-g",
      description: "Let's watch this video to get a better understanding of cruitwise",
    },
    {
      type: OnboardingTypes.DRESS_CODE, // 5
      itemList: ["Formal", "Business", "Business Casual"],
    },
    {
      type: OnboardingTypes.VISIT_LINK, // 6
      header: "Telegram",
      description: "Here's our work Telegram groups. Come join us!",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png",
      links: ["https://t.me/joinchat/AAAAAEo7z1Y1ZjI1", "https://t.me/joinchat/AAAAAEo7z1Y1ZjI1"],
      linksName: ["Floor 14 Chat", "Software Engineers"],
    },
    {
      type: OnboardingTypes.PEOPLE_OF_INTEREST, // 7
      people: [
        [
          [
            "Philipp",
            "Manager",
            "https://static.vecteezy.com/system/resources/previews/028/542/650/original/german-smiling-businessman-isolated-png.png",
          ],
          [
            "Mark",
            "Assistant Manager",
            "https://www.vhv.rs/dpng/d/124-1246728_stock-photography-businessperson-small-business-management-business-man.png",
          ],
        ],
        [
          [
            "Stephen Wise",
            "Mentor",
            "https://media.licdn.com/dms/image/v2/C5603AQEYeeX04ftK3g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1630941307625?e=1733961600&v=beta&t=9hziDVSy4B3QWO3mG7Re7XgaLyAo2jYs4hA-ZXHhpPE",
          ],
          [
            "Vivek Amarnani",
            "Mentor",
            "https://media.licdn.com/dms/image/v2/C5603AQGLICk4zoWYUQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1618304969119?e=1733961600&v=beta&t=kEI4DBmXZg3gTf6jhG3mjZ1lWEDi1DhXaMl2UkoNZTw",
          ],
        ],
        [
          ["Josh", "Software Intern", "https://cdn.openart.ai/published/ADwRzCRoQUpEVOqxP1X7/YeQ8rqHY__k-Q_raw.jpg"],
          [
            "John",
            "Cloud Intern",
            "https://st2.depositphotos.com/1010683/7109/i/450/depositphotos_71090693-stock-photo-caucasian-handsome-man-in-grey.jpg",
          ],
          [
            "Chris",
            "German Overseas Intern",
            "https://www.vhv.rs/dpng/d/124-1246728_stock-photography-businessperson-small-business-management-business-man.png",
          ],
          [
            "Jun Kang",
            "Frontend Intern",
            "https://media.licdn.com/dms/image/v2/D5603AQHuMhYoxKQoag/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1709385329364?e=1733961600&v=beta&t=yyVXrKTXM1Nq5ry27-mxxt5tXnYZhCi_dJYAmqPW2h4",
          ],
        ],
      ],
    },
    {
      type: OnboardingTypes.MARKDOWN, // 8
      header: "Here's how you can make your way to our office on your first day",
      markdown: `## Our Address: 11 Bishan Street 21, Singapore 573943\n\n- When you enter, ask our friendly receptionist for your access card.\n\n- Once received, proceed to the **14th floor** and you'll find our office.\n\n- Your table is the one with your name on it. \n\n ## Welcome to cruitwise!`,
    },
  ],
  roleArray: ["cruitwise", "Cloud Engineer"],
  name: "Patrick",
  onboardingProgressStage: 8,
};
