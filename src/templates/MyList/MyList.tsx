import { useEffect } from "react";
import { useAnimeListContext } from "../../hooks/useAnimeListContext";

// components
import { LuBookmarkPlus } from "react-icons/lu";
import NavBar from "../../components/NavBar/NavBar";
import AnimeCardList from "../../components/AnimeCardList/AnimeCardList";

import "./MyList.css";
import { HiOutlineEmojiSad } from "react-icons/hi";

function MyList() {
  const { animeList, fetchAnimeList, successMessage, error, clearMessages } =
    useAnimeListContext();

  useEffect(() => {
    fetchAnimeList();
  }, []);

  useEffect(() => {
    if (successMessage || error) {
      const timeOut = setTimeout(() => {
        clearMessages();
      }, 3000);

      return () => clearTimeout(timeOut);
    }
  }, [successMessage, error]);

  return (
    <>
      <NavBar />

      <div className="container-page">
        <div className="header-content">
          <div className="title-content-header">
            <LuBookmarkPlus size={28} />
            <h2 className="title-header">Sua lista !</h2>
          </div>
        </div>

        {successMessage && <p className="success-messages">{successMessage}</p>}
        {error && <p className="error">{error}</p>}

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
