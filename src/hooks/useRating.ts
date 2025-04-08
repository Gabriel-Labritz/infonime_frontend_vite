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

  async function rateAnime(animeId: string, rating: number): Promise<void> {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.post<RateAnimeResponse>(
        `/users/rate/${animeId}`,
        { rating },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      setSuccessMessage(response.data.message);
    } catch (error) {
      setError(
        (error as any).response?.data?.message ||
          (error instanceof Error
            ? error.message
            : "Ocorreu um erro tente novamente mais tarde.")
      );
    }
  }

  return { rateAnime, successMessage, setSuccessMessage, error };
}
