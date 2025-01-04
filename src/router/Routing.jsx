import React from "react";
import { Routes, Route, BrowserRouter, Navigate, Link } from "react-router-dom";
import PublicLayout from "../components/layout/public/PublicLayout";
import Feed from "../components/layout/publication/feed";
import Login from "../components/layout/user/Login";
import Register from "../components/layout/user/Register";
import PrivateLayout from "../components/layout/private/PrivateLayout";

const Routing = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default Routing;
