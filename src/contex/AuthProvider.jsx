import React from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { Global } from "../helpers/Global";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ _id: null, name: "", email: "" });;
  const [counters, setCounters] = useState({});
  const [loading, setLoading] = useState(true);

  const authUser = async () => {
    // Sacar datos usuario identificado del localstorage
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      // Comprobar si tengo el token y el user
      if (!token || !user) {
        setLoading(false);
        return false;
      }
      // Transformar los datos a un objeto javascript
      const userObj = JSON.parse(user);
      const userId = userObj.id;

      if (userId) {
        //Peticion ajax al backend que compruebe el token y
        // que devuelva todos los datos del usuario
        const [profileRes, countersRes] = await Promise.all([
          fetch(Global.url + "user/profile/" + userId, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }),
          fetch(Global.url + "user/counters/" + userId, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }),
        ]);

        const profileData = await profileRes.json();
        const countersData = await countersRes.json();

        setAuth(profileData.user);
        setCounters(countersData);
      }
    } catch (error) {
      console.error("Error al autenticar:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    authUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        counters,
        setCounters,
        authUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
