import { Link } from "react-router-dom";
import { AnimeData } from "../../utils-types/anime-data";

import "./AnimeCardSearch.css";

interface AnimeCardSearchProps {
  anime: AnimeData;
}

export function AnimeCardSearch({ anime }: AnimeCardSearchProps) {
  const { _id, title, anime_backdrop, seasons } = anime;

  const BASE_URL_IMG = import.meta.env.VITE_baseUrlImg;
  const urlImgBackdrop = `${BASE_URL_IMG}${anime_backdrop}`;

  return (
    <div className="anime-card-search-container">
      <Link to={`/anime/${_id}`}>
        <div className="anime-card-search-content">
          <div className="anime-card-search-img">
            <img src={urlImgBackdrop} alt={title} />
            <p className="see-more-anime">Ver anime</p>
          </div>

          <div className="anime-card-body-content">
            <h4 className="anime-card-title-body">{title}</h4>
            <div className="anime-card-bottom">
              <div className="anime-card-seasons-meta">
                {seasons > 1 ? `${seasons} temporadas` : `${seasons} temporada`}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
