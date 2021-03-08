import React, { createContext, useState, FC } from "react";
import { IUserContext } from "../interface";

const contextDefaultValues: IUserContext = {
  user: null,
  login: () => { },
  logout: () => { }
};

export const UserContext = createContext<IUserContext>(
  contextDefaultValues
);

const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<IUserContext["user"]>(contextDefaultValues.user);

  const login = (newUser: IUserContext["user"]) => setUser(newUser);
  const logout = () => setUser(null)

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout
      }
      }>
      { children}
    </UserContext.Provider>
  );
};

export default UserProvider;