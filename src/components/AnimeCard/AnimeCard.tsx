import { Link } from "react-router-dom";
import { AnimeData } from "../../utils-types/anime-data";

import "./AnimeCard.css";

interface AnimeCardProps {
  anime: AnimeData;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const BASE_URL: string = import.meta.env.VITE_baseUrlImg;
  const posterImgUrl = `${BASE_URL}${anime.anime_poster}`;

  return (
    <div className="animecard-container">
      <Link to={`/anime/${anime._id}`}>
        <div className="animecard-content-card">
          <div className="animecard-img-card">
            <img src={posterImgUrl} alt={anime.title} />
            <p className="see-more">Ver anime</p>
          </div>

          <div className="animecard-body-card">
            <h4 className="animecard-anime-title">{anime.title}</h4>
            <span className="animecard-anime-seasons">
              {anime.seasons > 1
                ? `${anime.seasons} temporadas`
                : `${anime.seasons} temporada`}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
