import { createRoot } from "react-dom/client";
import "../src/styles/global-styles.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
