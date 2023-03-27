import axios, { AxiosResponse } from "axios";
import { Movie } from "../interfaces/movieInterface";
import { User, UserFormValues } from "../interfaces/userInterface";

axios.defaults.baseURL = "https://localhost:5000/api";

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

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
};

const agent = {
  Account,
  Movies,
};

export default agent;
