import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import MovieListStore from "./movieListStore";
import MovieStore from "./movieStore";
import UserStore from "./userStore";

interface Store {
  commonStore: CommonStore;
  movieStore: MovieStore;
  modalStore: ModalStore;
  userStore: UserStore;
  movieListStore: MovieListStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  movieStore: new MovieStore(),
  modalStore: new ModalStore(),
  userStore: new UserStore(),
  movieListStore: new MovieListStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
