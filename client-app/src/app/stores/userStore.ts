import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../interfaces/userInterface";
import agent from "../api/agent";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;
  searchAnonymous: boolean = false;

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
      console.log(error);
      throw error;
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(undefined);
    this.user = null;
  };

  getUser = async () => {
    try {
      console.log("hey");
      const user = await agent.Account.current();
      console.log(user);
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  setSearchAnonymous = (state: boolean) => {
    this.searchAnonymous = state;
  };
}
