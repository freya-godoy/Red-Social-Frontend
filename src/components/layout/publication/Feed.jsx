import React, { useEffect, useState } from "react";
import avatar from "../../../assets/img/user.png";
import { data, Link, useParams } from "react-router-dom";
import { Global } from "../../../helpers/Global";
import useAuth from "../../../hooks/useAuth";
import PublicationList from "../publication/PublicationList";
const Feed = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState({});

  const [publications, setPublications] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState();
  const params = useParams();

  useEffect(() => {
    getPublications(1, false);
  }, []);

  const getPublications = async (nextPage = 1, newNews = false) => {

    if(newNews){
        setPublications([]);
        setPage(1)
        nextPage = 1;
    }
    const request = await fetch(
      Global.url + "publication/feed/" + nextPage,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const data = await request.json();

    if (data.status == "success") {
      let newPublications = data.publications;

      if (!newNews &&  publications.length >= 1) {
        newPublications = [...publications, ...data.publications];
      }

      setPublications(newPublications);

      if (!newNews && publications.length >= data.total - data.publications.length) {
        setMore(false);
      }

      if(data.pages <= 1 ){
        setMore(false)
      }
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Timeline</h1>
        <button className="content__button" onClick={() => getPublications(1, true)}>Mostrar nuevas</button>
      </header>
      <PublicationList
        publications={publications}
        getPublications={getPublications}
        page={page}
        setPage={setPage}
        more={more}
        setMore={setMore}
      />
    </>
  );
};

export default Feed;
