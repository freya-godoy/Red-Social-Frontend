import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import useAuth from "../../../hooks/useAuth.jsx";

const PublicLayout = () => {
  const { auth } = useAuth();

  return (
    <>
      {/* LAYOUT */}
      <Header />

      {/* Contenido principal */}
      <section className="layout_content">
        {!auth._id ? <Outlet /> : <Navigate to="/social/" />}
      </section>
    </>
  );
};

export default PublicLayout;
