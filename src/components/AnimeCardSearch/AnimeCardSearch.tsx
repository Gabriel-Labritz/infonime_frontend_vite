import { Link } from "react-router-dom";
import { AnimeData } from "../../utils-types/anime-data";
import "./AnimeCardSearch.css";
import { formatSeasonsEpisodes } from "../../utils/format-seasons-episodes";
import { truncate } from "../../utils/truncate";

interface AnimeCardSearchProps {
  animeData: AnimeData;
}

export function AnimeCardSearch({ animeData }: AnimeCardSearchProps) {
  const { _id, title, anime_backdrop, seasons, episodes, synopsis } = animeData;

  const BASE_URL_IMG = import.meta.env.VITE_baseUrlImg;
  const urlImgBackdrop = `${BASE_URL_IMG}${anime_backdrop}`;

  return (
    <div className="anime-card-search-container">
      <div className="anime-card-search-content">
        <div className="anime-card-search-img">
          <img src={urlImgBackdrop} alt={title} />
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

      <div className="anime-card-hover">
        <div className="anime-card-content-hover">
          <Link to={`/anime/${_id}`}>
            <div className="anime-card-body-hover">
              <h4 className="anime-title-hover">{title}</h4>
              <div className="anime-card-info-meta-container-hover">
                <div className="anime-card-info-meta-content-hover">
                  <span>
                    {seasons > 1
                      ? `${seasons} temporadas`
                      : `${seasons} temporada`}
                  </span>

                  <span>
                    {episodes > 1
                      ? `${episodes} episódios`
                      : `${episodes} episódio`}
                  </span>
                </div>
              </div>

              <p className="anime-card-synopsis-hover">
                {truncate(synopsis, 200)}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
