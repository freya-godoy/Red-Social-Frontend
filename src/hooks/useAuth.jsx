import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contex/AuthProvider.jsx";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
