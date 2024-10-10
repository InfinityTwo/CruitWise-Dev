import axios from "axios";
import { permission } from "process";

interface InviteUserToOrgType {
  email: string;
  orgName: string;
}

interface InviteUserToRepoType {
  uid: string;
  owner: string;
  repoName: string;
}

interface CheckMemberExistOrgType {
  orgName: string;
  uid: string;
  isOrganisation: boolean;
}

interface CheckMemberExistRepoType {
  owner: string;
  uid: string;
  repoName: string;
}

export const inviteUserToOrg = async ({ email, orgName }: InviteUserToOrgType) => {
  let res: any = {};

  await axios
    .post(
      "https://api.github.com/orgs/" + orgName + "/invitations",
      {
        email: email,
        role: "direct_member",
      },
      {
        method: "POST",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: "token " + process.env.REACT_APP_GITHUB_PERSONAL_CLASSIC_TOKEN,
        },
      },
    )
    .then((result) => {
      // console.log(result);
      res = { ...res, ...result };
      res.data.inviteLink = orgName;
    })
    .catch((err) => {
      // console.log(err);
    });

  return res;
};

export const inviteUserToRepo = async ({ uid, owner, repoName }: InviteUserToRepoType) => {
  let res: any = {};

  const userName = await axios
    .get("https://api.github.com/user/" + uid, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
    .then((result) => result.data.login);

  // console.log(
  //   "https://api.github.com/repos/" + owner + "/" + repoName + "/collaborators/" + userName,
  //   {},
  //   {
  //     method: "POST",
  //     headers: {
  //       "X-GitHub-Api-Version": "2022-11-28",
  //       Authorization: "token " + process.env.REACT_APP_GITHUB_PERSONAL_CLASSIC_TOKEN,
  //     },
  //   },
  // );

  await axios
    .put(
      "https://api.github.com/repos/" + owner + "/" + repoName + "/collaborators/" + userName,
      {},
      {
        method: "PUT",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: "token " + process.env.REACT_APP_GITHUB_PERSONAL_TOKEN,
        },
      },
    )
    .then((result) => {
      // console.log(result);
      res = { ...res, ...result };
      res.data.inviteLink = owner + "/" + repoName;
    })
    .catch((err) => {
      // console.log(err);
    });

  return res;
};

export const checkMemberExistsOrg = async ({ orgName, uid }: CheckMemberExistOrgType): Promise<boolean> => {
  return await axios
    .get("https://api.github.com/orgs/" + orgName + "/members", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: "token " + process.env.REACT_APP_GITHUB_PERSONAL_CLASSIC_TOKEN,
      },
    })
    .then((result) => {
      // console.log(result);
      for (let i = 0; i < result.data.length; i++) {
        if (parseInt(result.data[i].id) === parseInt(uid)) {
          return true;
        }
      }
      return false;
    });
};

export const checkMemberExistsRepo = async ({ owner, repoName, uid }: CheckMemberExistRepoType): Promise<boolean> => {
  return await axios
    .get("https://api.github.com/repos/" + owner + "/" + repoName + "/collaborators", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: "token " + process.env.REACT_APP_GITHUB_PERSONAL_TOKEN,
      },
    })
    .then((result) => {
      // console.log(result);
      for (let i = 0; i < result.data.length; i++) {
        if (parseInt(result.data[i].id) === parseInt(uid)) {
          return true;
        }
      }
      return false;
    });
};
