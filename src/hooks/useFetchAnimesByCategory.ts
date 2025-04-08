import { useState, useEffect } from "react";
import api from "../utils/api";
import { AnimeData } from "../utils-types/anime-data";
import { CategoriesInterface } from "../utils-types/categories-interface";

interface AnimeResponseData {
  animes: AnimeData[];
}

export function useFetchAnimesByCategory(category: CategoriesInterface) {
  const [animes, setAnimes] = useState<AnimeData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnimesCategory();
  }, [category]);

  async function fetchAnimesCategory() {
    try {
      const response = await api.get<AnimeResponseData>(
        `/animes/category/${category.category}`
      );
      setAnimes(response.data.animes);
    } catch (error) {
      setError(
        (error as any).response.data.message ||
          (error instanceof Error
            ? error.message
            : "Ocorreu um erro tente novamente mais tarde.")
      );
    }
  }

  return { animes, error };
}
