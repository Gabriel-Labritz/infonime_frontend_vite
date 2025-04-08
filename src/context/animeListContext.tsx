import { createContext, useState, ReactNode } from "react";
import { AnimeItem } from "../utils-types/anime-item";
import { AnimeListItem } from "../utils-types/anime-list-item";
import { AnimeData } from "../utils-types/anime-data";
import api from "../utils/api";

interface AnimeApiResponseMessage {
  message: string;
}

interface AnimeListContextProps {
  animeList: AnimeItem[];
  fetchAnimeList: () => Promise<AnimeItem[] | undefined>;
  addToList: (animeId: string, anime: AnimeData) => Promise<void>;
  removeFromList: (animeId: string) => Promise<void>;
  isAnimeAlreadyInList: (animeId: string) => boolean;
  clearMessages: () => void;
  successMessage: string | undefined;
  error: string | undefined;
}

interface AnimeListResponse {
  animeList: AnimeListItem[];
}

export const AnimeListContext = createContext<
  AnimeListContextProps | undefined
>(undefined);

export function AnimeListProvider({ children }: { children: ReactNode }) {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const [error, setError] = useState<string | undefined>(undefined);

  async function fetchAnimeList() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.get<AnimeListResponse>("/users/mylist", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      const userCurrentAnimeList = response.data.animeList.map(
        (item) => item.anime
      );

      setAnimeList(userCurrentAnimeList);

      return userCurrentAnimeList;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError((error as any)?.response?.data?.message);
      }
    }
  }

  async function addToList(animeId: string, anime: AnimeData) {
    try {
      const { _id, title, anime_backdrop, seasons, episodes } = anime;

      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.post<AnimeApiResponseMessage>(
        `/users/add-to-list/${animeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      const animeAddToList: AnimeItem = {
        _id,
        title,
        anime_backdrop,
        seasons,
        episodes,
      };

      setAnimeList((prevList) => [...prevList, animeAddToList]);

      setSuccessMessage(
        response?.data?.message || "Anime adicionado com sucesso!"
      );
      setError(undefined);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          (error as any)?.response?.data?.message ||
            "Erro ao adicionar anime na sua lista."
        );
      }
      setSuccessMessage(undefined);
    }
  }

  async function removeFromList(animeId: string) {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.post<AnimeApiResponseMessage>(
        `/users/remove-to-list/${animeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      setAnimeList((prevList) =>
        prevList.filter((anime) => anime._id !== animeId)
      );

      setSuccessMessage(response?.data?.message);
      setError(undefined);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          (error as any).response?.data?.message ||
            "Erro ao excluir anime da sua lista."
        );
      }

      setSuccessMessage(undefined);
    }
  }

  function isAnimeAlreadyInList(animeId: string): boolean {
    return animeList.some((anime) => anime._id === animeId);
  }

  function clearMessages() {
    setSuccessMessage(undefined);
    setError(undefined);
  }

  return (
    <AnimeListContext.Provider
      value={{
        fetchAnimeList,
        addToList,
        removeFromList,
        isAnimeAlreadyInList,
        clearMessages,
        animeList,
        successMessage,
        error,
      }}
    >
      {children}
    </AnimeListContext.Provider>
  );
}
