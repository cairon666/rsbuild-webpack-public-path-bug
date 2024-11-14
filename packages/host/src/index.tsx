import { createRoot } from "react-dom/client";
import { Host } from "./Host";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(<Host />);
} else {
  console.error("Container not found");
}
