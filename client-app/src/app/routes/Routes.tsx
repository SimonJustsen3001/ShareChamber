import { createBrowserRouter, RouteObject } from "react-router-dom";
import LoginForm from "../../features/form/LoginForm";
import HomePage from "../../features/home/HomePage";
import MoviePage from "../../features/movie/MoviePage";
import MovieListPage from "../../features/movieList/MovieListPage";
import App from "../layouts/App";
import TestPage from "../../features/testingPage/TestPage";
import RateForm from "../../features/form/RateForm";
import MovieDetailsPage from "../../features/movieDetails/movieDetailsPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "movie", element: <MoviePage /> },
      { path: "list", element: <MovieListPage /> },
      { path: "test", element: <TestPage /> },
      { path: "details", element: <MovieDetailsPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
