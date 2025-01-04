import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../private/Sidebar.jsx";


const PrivateLayout = () => {
  return (
    <>
      {/* LAYOUT */}

      {/* Cabecera y navegacion */}
      <Header />
      {/* Contenido principal */}
      <section className="layout_content">
        <Outlet />
      </section>

      {/* Barra lateral */}
    <Sidebar/>
    </>
  );
};

export default PrivateLayout;