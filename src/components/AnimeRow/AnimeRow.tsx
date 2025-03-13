import { useRef } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { AnimeData } from "../../utils-types/anime-data";
import AnimeCard from "../AnimeCard/AnimeCard";

import "./Animerow.css";

interface AnimeRowProps {
  categoryDisplayName: string;
  animes: AnimeData[];
}

export default function AnimeRow({
  categoryDisplayName,
  animes,
}: AnimeRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollLeft -= 800;
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollLeft += 800;
    }
  };

  return (
    <section className="container-row">
      <div className="row-header">
        <h2 className="title-row">{categoryDisplayName}</h2>
      </div>
      <div className="row-list-container">
        <div
          className="row-left"
          title="Anterior"
          aria-label="Anterior"
          onClick={scrollLeft}
        >
          <MdKeyboardArrowLeft size={44} />
        </div>
        <div
          className="row-right"
          title="Próximo"
          aria-label="Próximo"
          onClick={scrollRight}
        >
          <MdKeyboardArrowRight size={44} />
        </div>

        <div className="row-anime-list" ref={rowRef}>
          {animes.map((anime) => {
            return (
              <div className="row-anime-list-item">
                <AnimeCard animeData={anime} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
