import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { User } from "@firebase/auth-types";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const clickLogin = () => {
    const provider = new GoogleAuthProvider();
    navigate("/barcorde-scanner");
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
      <div className="text-right">
        <button className="mr-5" onClick={() => logout()}>logout</button>
      </div>
      <div className="mt-10">
        <div className="text-center">
          <button
            className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => clickLogin()}
          >
            Google でログイン
          </button>
        </div>
        {currentUser ? (
          <p className="text-center mt-5">{currentUser?.email}でログイン中</p>
        ) : null}
      </div>
    </div>
  );
};
