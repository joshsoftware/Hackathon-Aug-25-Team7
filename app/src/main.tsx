import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "@/root/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

console.log("Application starting...");

const rootElement = document.getElementById("root");
console.log("Root element found:", rootElement);

const queryClient = new QueryClient();

if (rootElement) {
  console.log("Creating root and rendering app...");
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </StrictMode>
  );
  console.log("App render triggered");
} else {
  console.error("Root element not found! Check your HTML structure.");
}