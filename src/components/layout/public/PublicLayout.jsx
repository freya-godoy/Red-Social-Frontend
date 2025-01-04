import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      {/* LAYOUT */}
      <Header />
      {/* Contenido principal */}
      <section className="layout_content">
        <Outlet />
      </section>
    </>
  );
};

export default PublicLayout;
