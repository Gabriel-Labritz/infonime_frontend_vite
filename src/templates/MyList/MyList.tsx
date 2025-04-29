import { useEffect } from "react";
import { useAnimeListContext } from "../../hooks/useAnimeListContext";

// components
import { LuBookmarkPlus } from "react-icons/lu";
import NavBar from "../../components/NavBar/NavBar";
import AnimeCardList from "../../components/AnimeCardList/AnimeCardList";
import Loading from "../../components/Loading/Loading";
import { HiOutlineEmojiSad } from "react-icons/hi";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import "./MyList.css";

function MyList() {
  const { animeList, fetchAnimeList, error, isLoading } = useAnimeListContext();

  useEffect(() => {
    fetchAnimeList();
  }, []);

  return (
    <>
      <NavBar />
      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}

      <div className="container-page">
        <div className="header-content">
          <div className="title-content-header">
            <LuBookmarkPlus size={28} />
            <h2 className="title-header">Sua lista !</h2>
          </div>
        </div>

        {animeList.length > 0 ? (
          <div className="list-area">
            {animeList.map((anime) => {
              return <AnimeCardList key={anime._id} {...anime} />;
            })}
          </div>
        ) : (
          <div className="empty-list-content">
            <p className="empty-list">Sua lista está vazia.</p>
            <HiOutlineEmojiSad size={30} />
          </div>
        )}
      </div>
    </>
  );
}

export default MyList;
