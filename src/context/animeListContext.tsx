import { createContext, useState } from "react";
import { AnimeItem } from "../utils-types/anime-item";
import { AnimeListItem } from "../utils-types/anime-list-item";
import { AnimeData } from "../utils-types/anime-data";
import { toast } from "react-toastify";
import api from "../utils/api";

interface AnimeListProviderProps {
  children: React.ReactNode;
}

interface AnimeListContextProps {
  animeList: AnimeItem[];
  fetchAnimeList: () => Promise<void>;
  addToList: (animeId: string, anime: AnimeData) => Promise<void>;
  removeFromList: (animeId: string) => Promise<void>;
  isAnimeAlreadyInList: (animeId: string) => boolean;
  clearMessages: () => void;
  error: string | null;
  isLoading: boolean;
}

interface AnimeApiResponseMessage {
  message: string;
}

interface AnimeListResponse {
  animeList: AnimeListItem[];
}

export const AnimeListContext = createContext<
  AnimeListContextProps | undefined
>(undefined);

export function AnimeListProvider({ children }: AnimeListProviderProps) {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchAnimeList(): Promise<void> {
    try {
      setIsLoading(true);

      const response = await api.get<AnimeListResponse>("/users/mylist");

      const userCurrentAnimeList = response.data.animeList.map(
        (item) => item.anime
      );

      setAnimeList(userCurrentAnimeList);
      setError(null);
    } catch (error) {
      setError(
        (error as any).response.data.message ||
          (error instanceof Error
            ? error.message
            : "Ocorreu um erro ao acessar a lista do usuário, tente novamente.")
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function addToList(animeId: string, anime: AnimeData): Promise<void> {
    const invalidId = !animeId || typeof animeId !== "string";
    const invalidAnime = !anime || typeof anime !== "object";

    if (invalidId || invalidAnime) {
      throw new Error(
        "addToList() requer os paramêtros animeId (string) e anime (object) válidos."
      );
    }

    try {
      setIsLoading(true);
      const { _id, title, anime_backdrop, seasons, episodes } = anime;

      const response = await api.post<AnimeApiResponseMessage>(
        `/users/add-to-list/${animeId}`,
        {}
      );

      const animeGoesToList: AnimeItem = {
        _id,
        title,
        anime_backdrop,
        seasons,
        episodes,
      };

      setAnimeList((prevList) => [...prevList, animeGoesToList]);

      toast.success(
        response?.data?.message ||
          "Anime foi adicionado a sua lista com sucesso!"
      );
    } catch (error) {
      toast.error(
        (error as any).response.data.message ||
          (error instanceof Error
            ? error.message
            : "Ocorreu um erro ao adicionar o anime a lista do usuário, tente novamente.")
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function removeFromList(animeId: string): Promise<void> {
    if (!animeId || typeof animeId !== "string") {
      throw new Error(
        "removeFromList() requer o paramêtro animeId (string) válido."
      );
    }

    try {
      setIsLoading(true);

      const response = await api.post<AnimeApiResponseMessage>(
        `/users/remove-to-list/${animeId}`,
        {}
      );

      setAnimeList((prevList) =>
        prevList.filter((anime) => anime._id !== animeId)
      );

      toast.success(
        response?.data?.message ||
          "Anime foi removido da sua lista com sucesso!"
      );
    } catch (error) {
      toast.error(
        (error as any).response.data.message ||
          (error instanceof Error
            ? error.message
            : "Ocorreu um erro ao excluir o anime da sua lista, tente novamente.")
      );
    } finally {
      setIsLoading(false);
    }
  }

  function isAnimeAlreadyInList(animeId: string): boolean {
    if (!animeId || typeof animeId !== "string") {
      throw new Error(
        "isAnimeAlreadyInList() requer o paramêtro animeId (string) válido."
      );
    }

    return animeList.some((anime) => anime._id === animeId);
  }

  function clearMessages() {
    setError(null);
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
        error,
        isLoading,
      }}
    >
      {children}
    </AnimeListContext.Provider>
  );
}
