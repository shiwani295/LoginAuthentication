import React, { useState } from "react";
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null); //for the token if we have token user isloggedin if dont have not loggedin

  const userIsLoggedIn = !!token; //this is the feature of js it will give boolean value true and (is sting is emptythen return )false

  const loginHandler = (token) => {
    //if the user login set the token
    setToken(token);
  };
  const logoutHandler = () => {
    //if the user logout set the token null
    setToken(null);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  //this auth provider use as a whole context when we and we can access the token
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

//this authentication apply on authform,mainNavigation,index,js
