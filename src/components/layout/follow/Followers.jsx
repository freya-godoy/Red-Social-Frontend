import React, { useEffect, useState } from "react";
import avatar from "../../../assets/img/user.png";
import { Global } from "../../../helpers/Global";
import { useParams } from "react-router-dom";
import UserList from "../user/UserList";
import GetProfile from "../../../helpers/Getprofile";

const Followers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});

  const params = useParams();

  useEffect(() => {
    getUsers(1);
    GetProfile(params.userId, setUserProfile);
  }, []);

  const getUsers = async (nexPage = 1) => {
    // efecto de cargas
    setLoading(true);

    //Sacar userId de la url
    const userId = params.userId;

    // Peticion para sacar usuarios
    const request = await fetch(
      Global.url + "follow/followers/" + userId + "/" + nexPage,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const data = await request.json();

    // Recorrer y limpiar follows para quedarme con followed

    let cleanUsers = [];
    data.follows.forEach((follow) => {
      data.users = [...cleanUsers, follow.user];
    });
    data.users = cleanUsers;

    //Crear un estado para poder listar
    if (data.users && data.status == "success") {
      let newUser = data.users;

      if (users.lengh >= 1) {
        newUser = [...users, ...data.users];
      }

      setUsers(newUser);
      setFollowing(data.user_following);
      setLoading(false);

      // Paginacion
      if (users.lengh >= data.total - data.users.lengh) {
        setMore(false);
      }
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Seguidores de {userProfile.name} </h1>
      </header>

      <UserList
        users={users}
        getUsers={getUsers}
        following={following}
        setFollowing={setFollowing}
        page={page}
        setPage={setPage}
        more={more}
        loading={loading}
      />
    </>
  );
};

export default Followers;
