import "./404.css";

interface PageNotFoundProps {
  error: string;
}

export default function PageNotFound({ error }: PageNotFoundProps) {
  return <div>{error}</div>;
}
