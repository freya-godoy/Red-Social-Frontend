import { Global } from "./Global";

const GetProfile = async (userId, setState) => {
  // Asegúrate de eliminar espacios adicionales en el userId
  const trimmedUserId = userId.trim();

  try {
    const request = await fetch(Global.url + "user/profile/" + trimmedUserId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await request.json();
    if (data.status === "success") {
      setState(data.user);
    } else {
      console.error("Error en los datos del perfil:", data.message);
    }
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
  }

  return data;
};

export default GetProfile;

