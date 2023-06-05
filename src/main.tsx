import React from "react";
import ReactDOM from "react-dom/client";
import App, { queryClient } from "./App";
import { QueryClientProvider } from "react-query";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLAnchorElement
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
