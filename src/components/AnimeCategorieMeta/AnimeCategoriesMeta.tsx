import "./AnimeCategoriesMeta.css";

interface AnimeCategoriesMetaProps {
  categories: string[];
}

export default function AnimeCategoriesMeta({
  categories,
}: AnimeCategoriesMetaProps) {
  return (
    <div className="anime-category-container-meta">
      <span>Gêneros: </span>
      <small>{categories.join(", ")}</small>
    </div>
  );
}
