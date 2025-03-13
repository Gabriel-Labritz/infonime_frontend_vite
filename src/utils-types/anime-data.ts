export interface AnimeData {
    _id: string;
    title: string;
    synopsis: string;
    episodes: string;
    seasons: string;
    category: Array<string>;
    release_date: number;
    anime_poster: string;
    anime_backdrop: string;
    distributor: string;
    audio: string;
    content_classification: string;
    rating: number
}