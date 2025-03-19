import { DiscussionEmbed } from "disqus-react";
import "./Comments.css";

interface CommentsProps {
  animeId: string;
  animeTitle: string;
}

export default function Comments({ animeId, animeTitle }: CommentsProps) {
  const stringId = String(animeId);

  return (
    <div className="comments-container">
      <DiscussionEmbed
        shortname="infonime"
        config={{
          url: `http://127.0.0.1:5173/animes/${stringId}`,
          identifier: animeId,
          title: animeTitle,
          language: "pt_BR",
        }}
      />
    </div>
  );
}
