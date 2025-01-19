import React from "react";
import Header from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../private/Sidebar.jsx";
import useAuth from "../../../hooks/useAuth.jsx";

const PrivateLayout = () => {
  const { auth, loading } = useAuth();

  // Indicador de carga
  if (loading) {
    return <h1>Cargando...</h1>;
  }

  // Redirección si no está autenticado
  if (!auth._id) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {/* Cabecera y navegación */}
      <Header />

      {/* Contenido principal */}
      <section className="layout_content">
        <Outlet />
      </section>

      {/* Barra lateral */}
      <Sidebar />
    </>
  );
};

export default PrivateLayout;
