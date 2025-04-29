import { useEffect, useState } from "react";
import { AnimeData } from "../utils-types/anime-data";
import api from "../utils/api";

interface AnimesResponseData {
  animes: AnimeData[];
}

export function useFetchAnimes() {
  const [animes, setAnimes] = useState<AnimeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAnimes();
  }, []);

  async function loadAnimes(): Promise<void> {
    try {
      setIsLoading(true);
      const response = await api.get<AnimesResponseData>("/animes/all");

      if (!response.data || !Array.isArray(response.data.animes)) {
        setError("Nenhum anime foi encontrado!");
        return;
      }

      setAnimes(response.data.animes);
      setError(null);
    } catch (error) {
      setError(
        (error as any).response?.data?.message ||
          (error instanceof Error
            ? error.message
            : "Falha ao carregar animes. Tente recarregar a página.")
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { animes, error, isLoading };
}
