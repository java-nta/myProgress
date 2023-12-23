import { createContext, useContext, useEffect, useState } from "react";
import api from "../Api";
const AuthContext = createContext({
  setCurrentUser: () => {},
  setUserToken: () => {},
  logou: () => {},
  userToken: null,
  currentUser: {},
});

export const AuthContextProvider = ({ children }) => {
  const [userToken, _setUserToken] = useState(
    localStorage.getItem("USERTOKEN") || null
  );
  const [currentUser, _setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("CURRENTUSER")) || null
  );
  const setUserToken = (token) => {
    localStorage.setItem("USERTOKEN", token);
    _setUserToken(token);
  };
  const setCurrentUser = (data) => {
    localStorage.setItem("CURRENTUSER", JSON.stringify(data));
    _setCurrentUser(data);
    setUserToken(data.user_token);
  };

  const logout = () => {
    localStorage.clear();
    _setUserToken(null);
    _setCurrentUser(null);
  };
  useEffect(() => {
    if (userToken) {
      api
        .get("/auth/testToken", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => console.log(response.data))
        .catch((err) => {
          logout();
        });
    }
  }, [userToken]);
  return (
    <AuthContext.Provider
      value={{
        userToken,
        currentUser,
        setCurrentUser,
        setUserToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
