import { GithubAuthProvider, OAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { useState } from "react";

import { auth } from "../../utils/firebase";

export interface useSignInType {
  error: boolean;
  isPending: boolean;
  user: UserCredential | null;
  signIn: () => Promise<UserCredential | null>;
}

export const useSignInWithGithub = (): useSignInType => {
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [user, setUser] = useState<UserCredential | null>(null);
  const provider = new GithubAuthProvider();

  const signIn = async () => {
    setIsPending(true);
    let res: UserCredential | null = null;
    try {
      res = await signInWithPopup(auth, provider);
      console.log(res);
      setUser(res);
    } catch (err) {
      setError(true);
    }
    setIsPending(false);
    return res;
  };

  return { error, isPending, user, signIn };
};

export const useSignInWithMicrosoft = (): useSignInType => {
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [user, setUser] = useState<UserCredential | null>(null);
  const provider = new OAuthProvider("microsoft.com");

  const signIn = async () => {
    setIsPending(true);
    let res: UserCredential | null = null;
    try {
      res = await signInWithPopup(auth, provider);
      console.log(res);
      setUser(res);
    } catch (err) {
      setError(true);
    }
    setIsPending(false);
    return res;
  };

  return { error, isPending, user, signIn };
};
