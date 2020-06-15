import React, { useState } from "react";

export const AuthContext = React.createContext({
  isAuth: false,
  signin: () => {},
  signup: () => {},
  signout: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signInHandler = () => {
    console.log("SIGNIN HANDLER");
    setIsAuthenticated(true);
  };
  const signUpHandler = () => {
    console.log("SIGNUP HANDLER");
    setIsAuthenticated(true);
  };
  const signOutHandler = () => {
    console.log("SIGNOUT HANDLER");
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuthenticated,
        signin: signInHandler,
        signup: signUpHandler,
        signout: signOutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
