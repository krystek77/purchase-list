import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext({
  idToken: null,
  userId: null,
  email: null,
  error: null,
  loading: false,
  clearError: () => {},
  signin: () => {},
  signup: () => {},
  signout: () => {},
});

const AuthContextProvider = (props) => {
  const [authDataUser, setAuthDataUser] = useState({
    idToken: null,
    userId: null,
    email: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthDataUser((prevState) => ({
        ...prevState,
        idToken: null,
        email: null,
        userId: null,
      }));
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));

      if (expirationDate > new Date()) {
        setAuthDataUser((prevState) => ({
          ...prevState,
          idToken: token,
          email: localStorage.userEmail,
          userId: localStorage.userId,
        }));
      } else {
        setAuthDataUser((prevState) => ({
          ...prevState,
          idToken: null,
          email: null,
          userId: null,
        }));
      }
    }
    return () => {};
  }, []);

  /**
   *
   * @param {*} email
   * @param {*} password
   */
  const signInHandler = (email, password) => {
    const signInUser = async () => {
      setAuthDataUser({ ...authDataUser, loading: true });
      try {
        const authData = {
          email: email,
          password: password,
          returnSecureToken: true,
        };
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY_FIREBASE}`,
          {
            method: "POST",
            body: JSON.stringify(authData),
            headers: { "Content-Type": "application/json" },
          }
        );

        const responseData = await response.json();
        if (response.status === 200) {
          const expirationDate = new Date(
            new Date().getTime() + responseData.expiresIn * 1000
          );
          localStorage.setItem("token", responseData.idToken);
          localStorage.setItem("userId", responseData.localId);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("userEmail", responseData.email);

          setAuthDataUser({
            ...authDataUser,
            idToken: responseData.idToken,
            userId: responseData.localId,
            email: responseData.email,
            loading: false,
          });
        } else {
          setAuthDataUser({
            ...authDataUser,
            error: responseData.error,
            loading: false,
          });
          throw Error();
        }
      } catch (error) {
        console.log(error);
      }
    };
    signInUser();
  };
  /**
   *
   * @param {*} email
   * @param {*} password
   */
  const signUpHandler = (email, password) => {
    setAuthDataUser({ ...authDataUser, loading: true });
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const signUpUser = async () => {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY_FIREBASE}`,
          {
            method: "POST",
            body: JSON.stringify(authData),
            headers: { "Content-Type": "application/json" },
          }
        );
        const responseData = await response.json();
        if (response.status === 200) {
          const expirationDate = new Date(
            new Date().getTime() + responseData.expiresIn * 1000
          );
          localStorage.setItem("token", responseData.idToken);
          localStorage.setItem("userId", responseData.localId);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("userEmail", responseData.email);

          setAuthDataUser({
            ...authDataUser,
            idToken: responseData.idToken,
            userId: responseData.localId,
            email: responseData.email,
            loading: false,
          });
        } else {
          setAuthDataUser({
            ...authDataUser,
            error: responseData.error,
            loading: false,
          });
          throw Error();
        }
      } catch (error) {
        console.log(error);
      }
    };
    signUpUser();
  };
  /**
   *
   */
  const signOutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userEmail");

    setAuthDataUser({
      ...authDataUser,
      idToken: null,
      userId: null,
      email: null,
      error: null,
      loading: false,
    });
  };
  /**
   *
   */
  const errorHandler = () => {
    setAuthDataUser({
      ...authDataUser,
      error: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        idToken: authDataUser.idToken,
        userId: authDataUser.userId,
        email: authDataUser.email,
        error: authDataUser.error,
        loading: authDataUser.loading,
        signin: signInHandler,
        signup: signUpHandler,
        signout: signOutHandler,
        clearError: errorHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
