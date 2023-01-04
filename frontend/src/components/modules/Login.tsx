import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { User } from "@firebase/auth-types";

export const Login = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const clickLogin = () => {
    const provider = new GoogleAuthProvider();
    return auth.signInWithRedirect(provider);
  };

  const logout = () => {
    return auth.signOut();
};

  useEffect(() => {
    return auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => clickLogin()}>Google でログイン</button>
        <p>{currentUser?.email} でログイン中</p>
        <button onClick={()=>logout()}>logout</button>
      </div>
    </div>
  );
};
