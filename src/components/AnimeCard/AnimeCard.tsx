import { Link } from "react-router-dom";
import { AnimeData } from "../../utils-types/anime-data";
import { LuBookmarkPlus } from "react-icons/lu";
import { FiPlay } from "react-icons/fi";
import { truncate } from "../../utils/truncate";

import "./AnimeCard.css";

interface AnimeCardProps {
  animeData: AnimeData;
}

export default function AnimeCard({ animeData }: AnimeCardProps) {
  const BASE_URL = import.meta.env.VITE_baseUrlImg;
  const imageUrl = `${BASE_URL}${animeData.anime_poster}`;

  return (
    <div className="animecard-container">
      <div className="animecard-content-card">
        <div className="animecard-img-card">
          <img src={imageUrl} alt={animeData.title} />
        </div>
        <div className="animecard-body-card">
          <h4 className="animecard-anime-title">{animeData.title}</h4>
          <span className="animecard-anime-seasons">
            {parseInt(animeData.seasons) > 1
              ? `${animeData.seasons} temporadas`
              : `${animeData.seasons} temporada`}
          </span>
        </div>
      </div>

      <div className="animecard-container-hover">
        <div className="animecard-content-hover">
          <a
            className="animecard-poster-wrapper-hover"
            href={`/anime/${animeData._id}`}
          >
            <div className="animecard-image-hover">
              <figure className="animecard-figure-hover">
                <img src={imageUrl} alt={animeData.title} />
              </figure>
            </div>
          </a>

          <div className="animecard-body-hover">
            <Link to={`/anime/${animeData._id}`}>
              <h4 className="animecard-title-hover">{animeData.title}</h4>
              <div className="animecard-meta-infos-hover">
                <div className="animecard-meta-hover">
                  <span>
                    {parseInt(animeData.seasons) > 1
                      ? `${animeData.seasons} temporadas`
                      : `${animeData.seasons} temporada`}
                  </span>
                  <span>
                    {parseInt(animeData.episodes) > 1
                      ? `${animeData.episodes} episódios`
                      : `${animeData.episodes} spisódio`}
                  </span>
                </div>
              </div>
              <h4 className="animecard-synopis-hover">
                {truncate(animeData.synopsis, 150)}
              </h4>
            </Link>
          </div>

          <div className="animecard-footer-hover">
            <div className="animecard-footer-icon-hover">
              <div>
                <Link to="#">
                  <button title="Ver detalhes">
                    <FiPlay size={25} />
                  </button>
                </Link>
              </div>
            </div>

            <div className="animecard-footer-icon-hover">
              <div>
                <Link to="#">
                  <button title="Adicionar a lista">
                    <LuBookmarkPlus size={25} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
