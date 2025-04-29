import { useEffect, useState } from "react";
import { AnimeData } from "../utils-types/anime-data";
import { useSearchParams } from "react-router-dom";
import api from "../utils/api";

interface AnimesApiResponseData {
  animes: AnimeData[];
}

export function useAnimeSearch() {
  const [searchParams] = useSearchParams();
  const [animes, setAnimes] = useState<AnimeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const query = searchParams.get("q");

  useEffect(() => {
    if (!query) return;
    fetchAnimeSearch();
  }, [query]);

  async function fetchAnimeSearch(): Promise<void> {
    try {
      setIsLoading(true);
      const response = await api.get<AnimesApiResponseData>(
        `/animes/search/${query}`
      );

      setAnimes(response.data.animes);
      setError(null);
    } catch (error) {
      setError(
        (error as any)?.response?.data?.message ||
          (error instanceof Error
            ? error.message
            : "Ocorreu um erro, tente novamente mais tarde.")
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { animes, error, isLoading, query };
}
