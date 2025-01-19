import React, { useEffect, useState } from "react";
import avatar from "../../../assets/img/user.png";
import { Global } from "../../../helpers/Global";
import { useParams } from "react-router-dom";
import UserList from "../user/UserList";
import GetProfile from "../../../helpers/Getprofile";


const Following = () => {
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

  const getUsers = async (nextPage = 1) => {
    setLoading(true);

    const userId = params.userId;

    try {
      const request = await fetch(
        Global.url + "follow/following/" + userId + "/" + nextPage,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await request.json();

      if (data.follows && data.status === "success") {
        const cleanUsers = data.follows.map((follow) => follow.followed);
        const newUsers =
          nextPage === 1 ? cleanUsers : [...users, ...cleanUsers];

        setUsers(newUsers);
        setFollowing(data.user_following);

        if (newUsers.length >= data.total) {
          setMore(false);
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">
          Usuarios que sigue {userProfile.name || "Usuario"}{" "}
          {userProfile.surname || ""}
        </h1>
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

      <div className="content__posts">
        {users.map((user) => (
          <article className="posts__post" key={user._id}>
            <div className="post__container">
              <div className="post__image-user">
                <a href="#" className="post__image-link">
                  {user.image !== "default.png" ? (
                    <img
                      src={Global.url + "user/avatar/" + user.image}
                      className="post__user-image"
                      alt="Foto de perfil"
                    />
                  ) : (
                    <img
                      src={avatar}
                      className="post__user-image"
                      alt="Foto de perfil"
                    />
                  )}
                </a>
              </div>

              <div className="post__body">
                <div className="post__user-info">
                  <a href="#" className="user-info__name">
                    {user.name} {user.surname}
                  </a>
                  <span className="user-info__divider"> | </span>
                  <a href="#" className="user-info__create-date">
                    {new Date(user.created_at).toLocaleDateString()}
                  </a>
                </div>

                <h4 className="post__content">{user.bio}</h4>
              </div>
            </div>
          </article>
        ))}
      </div>

      <br />
    </>
  );
};

export default Following;
