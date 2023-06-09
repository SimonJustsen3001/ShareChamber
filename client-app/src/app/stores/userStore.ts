import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../interfaces/userInterface";
import agent from "../api/agent";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;
  searchAnonymous: boolean = false;
  isSmallScreen: boolean = true;
  currentTheme: number = 0;
  backgrounds: string[] = [
    "/cheng-feng-psdV2Rl-GvU-unsplash.jpg",
    "/pexels-guillaume-meurice-2873671.jpg",
  ];

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
    } catch (error) {
      throw error;
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(undefined);
    this.user = null;
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {}
  };

  setSearchAnonymous = (state: boolean) => {
    this.searchAnonymous = state;
  };

  setIsSmallScreen = (state: boolean) => {
    this.isSmallScreen = state;
  };

  setTheme = (theme: number) => {
    this.currentTheme = theme;
  };
}
