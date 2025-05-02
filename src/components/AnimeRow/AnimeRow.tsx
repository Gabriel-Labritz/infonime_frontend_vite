import { useRef } from "react";
import { CategoriesInterface } from "../../utils-types/categories-interface";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useFetchAnimesByCategory } from "../../hooks/useFetchAnimesByCategory";

import AnimeCard from "../AnimeCard/AnimeCard";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading";

import "./AnimeRow.css";

interface AnimeRowProps {
  category: CategoriesInterface;
}

export default function AnimeRow({ category }: AnimeRowProps) {
  const { displayName, categoryName } = category;
  const { animes, error, isLoading } = useFetchAnimesByCategory(categoryName);
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    rowRef.current && (rowRef.current.scrollLeft -= 800);
  };

  const scrollRight = () => {
    rowRef.current && (rowRef.current.scrollLeft += 800);
  };

  return (
    <section className="container-row">
      <div className="row-header">
        <h2 className="title-row">{displayName}</h2>
      </div>

      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && (
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
                <div key={anime._id} className="row-anime-list-item">
                  <AnimeCard anime={anime} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
