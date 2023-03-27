import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import MovieStore from "./movieStore";

interface Store {
  commonStore: CommonStore;
  movieStore: MovieStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  movieStore: new MovieStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
