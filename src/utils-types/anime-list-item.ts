import { AnimeItem } from "./anime-item";

export interface AnimeListItem {
  anime: AnimeItem;
  rating: number | null;
  _id: string;
}
