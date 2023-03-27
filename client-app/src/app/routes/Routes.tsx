import { createBrowserRouter, RouteObject } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import MoviePage from "../../features/movie/MoviePage";
import App from "../layouts/App";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "movie", element: <MoviePage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
