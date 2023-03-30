import axios, { AxiosResponse } from "axios";
import { Movie } from "../interfaces/movieInterface";
import { MovieList } from "../interfaces/movieListInterface";
import { User, UserFormValues } from "../interfaces/userInterface";
import { store } from "../stores/store";

axios.defaults.baseURL = "https://localhost:5000/api";

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Movies = {
  list: (query: string) => requests.get<Movie[]>(`/movie/${query}`),
};

const MovieLists = {
  list: () => requests.get<MovieList[]>("/movielist"),
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
