import { useContext } from "react";
import { AnimeListContext } from "../context/animeListContext";

export function useAnimeListContext() {
  const context = useContext(AnimeListContext);

  if (!context) {
    throw new Error(
      "useAnimeListContext deve ser usado dentro de um AnimeListProvider !"
    );
  }

  return context;
}
