import { createBrowserRouter, RouteObject } from "react-router-dom";
import LoginForm from "../../features/form/LoginForm";
import HomePage from "../../features/home/HomePage";
import MoviePage from "../../features/movie/MoviePage";
import MovieListPage from "../../features/movieList/MovieListPage";
import App from "../layouts/App";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "movie", element: <MoviePage /> },
      { path: "list", element: <MovieListPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
