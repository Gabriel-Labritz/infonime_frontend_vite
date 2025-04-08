import { useAnimeListContext } from "../../hooks/useAnimeListContext";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";

import "./AnimeCardList.css";

interface AnimeCardListProps {
  _id: string;
  title: string;
  anime_backdrop: string;
  seasons: number;
  episodes: number;
}

export default function AnimeCardList({ ...anime }: AnimeCardListProps) {
  const { removeFromList } = useAnimeListContext();

  const BASE_URL = import.meta.env.VITE_baseUrlImg;
  const imageUrl = `${BASE_URL}${anime.anime_backdrop}`;

  const handleRemoveFromList = async () => {
    await removeFromList(anime._id);
  };

  return (
    <div className="anime-card-list-container">
      <div className="anime-card-list-content">
        <div className="anime-card-list-img-content">
          <img src={imageUrl} alt={anime.title} />
        </div>

        <div className="anime-card-list-body">
          <h4 className="anime-card-list-title">
            <Link to={`/anime/${anime._id}`}>{anime.title}</Link>
          </h4>

          <div className="anime-card-list-bottom">
            <div className="anime-card-list-seasons-meta">
              <span>{anime.seasons} temporadas</span>
            </div>

            <button
              className="anime-card-list-remove-btn"
              title="Remover da lista"
              onClick={handleRemoveFromList}
            >
              <GoTrash size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
