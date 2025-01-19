import React, { useEffect, useState } from "react";
import avatar from "../../../assets/img/user.png";
import { Global } from "../../../helpers/Global"
import UserList from "./UserList";

const People = () => {
 
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (nexPage = 1) => {
    // efecto de cargas
    setLoading(true);
    // Peticion para sacar usuarios
    const request = await fetch(Global.url + "user/list/" + nexPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();

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
        <h1 className="content__title">Gente</h1>
        <button className="content__button">Mostrar nuevas</button>
      </header>

      <UserList users={users}
                getUsers={getUsers}
                following={following}
                setFollowing={setFollowing}
                page={page}
                setPage={setPage}
                more={more}
                loading={loading}
       
       ></UserList>

      <div className="content__posts">
        {users.map((user) => {
          return (
            <article className="posts__post" key={user._id}>
              <div className="post__container">
                <div className="post__image-user">
                  <a href="#" className="post__image-link">
                    {user.image != "default.png" && (
                      <img
                        src={Global.url + "/user/avatar/" + user.image}
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                    {user.image == "default.png" && (
                      <img
                        src={avatar}
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                    <img
                      src={avatar}
                      className="post__user-image"
                      alt="Foto de perfil"
                    />
                  </a>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <a href="#" className="user-info__name">
                      {user.name} {user.surname}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      {user.created_at}
                    </a>
                  </div>

                  <h4 className="post__content">{user.bio}</h4>
                </div>
              </div>

            </article>
          );
        })}
      </div>
     
      <br />
    </>
  );
};

export default People;
