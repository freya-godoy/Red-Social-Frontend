import React from "react";
import { Routes, Route, BrowserRouter, Navigate, Link } from "react-router-dom";
import PublicLayout from "../components/layout/public/PublicLayout";
import Feed from "../components/layout/publication/feed";
import Login from "../components/layout/user/Login";
import Register from "../components/layout/user/Register";
import PrivateLayout from "../components/layout/private/PrivateLayout";
import AuthProvider from "../contex/AuthProvider";
import Logout from "../components/layout/user/Logout";
import People from "../components/layout/user/People";
import Config from "../components/layout/user/Config";
import Following from "../components/layout/follow/following";
import Followers from "../components/layout/follow/followers";
import Profile from "../components/layout/user/Profile";

const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />
          </Route>

          {/* Rutas privadas */}
          <Route path="/social" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="logout" element={<Logout/>}/>
            <Route path="gente" element={<People/>}/>
            <Route path="ajustes" element={<Config/>}/>
            <Route path="siguiendo/:userId" element={<Following/>}/>
            <Route path="seguidores/:userId" element={<Followers/>}/>
            <Route path="perfil/:userId" element={<Profile/>}/>
          </Route>

          <Route
            path="*"
            element={
              <>
                <h1>Error 404</h1>
                <Link to="/">Volver al inicio</Link>
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routing;
