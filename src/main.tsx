import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/global.scss";
import { AppContextProvider } from "@contexts/AppContext";
import { BrowserRouter } from "react-router-dom";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";

const queryClient: QueryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
