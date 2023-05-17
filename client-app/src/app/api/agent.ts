import axios, { AxiosError, AxiosResponse } from "axios";
import { Movie, MovieId } from "../interfaces/movieInterface";
import {
  MovieList,
  MovieListCreateFormValues,
} from "../interfaces/movieListInterface";
import { User, UserFormValues } from "../interfaces/userInterface";
import { store } from "../stores/store";
import { router } from "../routes/Routes";
import { toast } from "react-toastify";
import { Rating } from "../interfaces/ratingInterface";

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "https://sharechamber.com/api";

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id"))
          router.navigate("/not-found");
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
              toast.error(data.errors[key][0]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unauthorized");
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  patch: <T>(url: string, body: {}) =>
    axios.patch<T>(url, body).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const requestsNoBody = {
  post: <T>(url: string, body: {}) => axios.post<Movie[]>(url, body),
};

const Movies = {
  list: (query: string) => requests.get<Movie[]>(`/movie/${query}`),
  createMovie: (query: string) =>
    requestsNoBody.post<Movie[]>(`/movie/${query}`, []),
  updateMovieRating: (rating: Rating) =>
    requests.post<MovieId>(`/movie/${rating.movieId}/rating`, rating),
  single: (movieId: string) => requests.get<Movie>(`/movie/${movieId}/details`),
};

const MovieLists = {
  list: () => requests.get<MovieList[]>("/movielist"),
  createList: (movieList: MovieListCreateFormValues) =>
    requests.post<MovieList>(`/movielist/${movieList.name}`, movieList),
  addMovieToList: (movieListId: string, movieId: MovieId) =>
    requests.patch<MovieId>(`/movielist/${movieListId}`, movieId),
  removeMovieFromList: (movieListId: string, movieId: string) =>
    requests.patch<MovieId>(
      `/movielist/${movieListId}/removeMovie/${movieId}`,
      []
    ),
  deleteList: (movieListId: string) =>
    requests.del<MovieList>(`/movielist/${movieListId}`),
  addCollaborator: (movieListId: string, collaboratorName: string) =>
    requests.patch<MovieId>(
      `/movielist/${movieListId}/addCollaborator/${collaboratorName}`,
      []
    ),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
};

const agent = {
  Account,
  Movies,
  MovieLists,
};

export default agent;
