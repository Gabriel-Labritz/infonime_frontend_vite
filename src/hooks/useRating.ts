import { useState } from "react";
import api from "../utils/api";

interface RateAnimeResponse {
  message: string;
  anime: {
    _id: string;
    title: string;
    rating: number;
    ratingCount: number;
  };
}

export function useRating() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function rateAnime(animeId: string, rating: number): Promise<void> {
    const invalidId = !animeId || typeof animeId !== "string";
    const invalidRating = !rating || typeof rating !== "number";

    if (invalidId || invalidRating) {
      throw new Error(
        "rateAnime() requer os paramêtros animeId (string) e rating (number) válidos."
      );
    }

    try {
      setIsLoading(true);

      const response = await api.post<RateAnimeResponse>(
        `/users/rate/${animeId}`,
        { rating }
      );

      setSuccessMessage(response.data.message);
      setError(null);
    } catch (error) {
      setError(
        (error as any).response?.data?.message ||
          (error instanceof Error
            ? error.message
            : "Ocorreu um erro tente novamente mais tarde.")
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { rateAnime, successMessage, setSuccessMessage, isLoading, error };
}
