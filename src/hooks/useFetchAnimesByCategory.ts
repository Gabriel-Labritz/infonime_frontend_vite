import { useState, useEffect } from "react";
import api from "../utils/api";
import { AnimeData } from "../utils-types/anime-data";

interface AnimeResponseData {
  animes: AnimeData[];
}

export function useFetchAnimesByCategory(category: string) {
  const [animes, setAnimes] = useState<AnimeData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!category || typeof category !== "string") {
    throw new Error(
      "hook useFetchAnimesByCategory() requer um paramêtro category(string) válido."
    );
  }

  useEffect(() => {
    fetchAnimesByCategory();
  }, [category]);

  async function fetchAnimesByCategory(): Promise<void> {
    try {
      setIsLoading(true);

      const response = await api.get<AnimeResponseData>(
        `/animes/category/${category}`
      );

      setAnimes(response.data.animes);
      setError(null);
    } catch (error) {
      setError(
        (error as any).response.data.message ||
          (error instanceof Error
            ? error.message
            : "Ocorreu um erro tente novamente mais tarde.")
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { animes, error, isLoading };
}
