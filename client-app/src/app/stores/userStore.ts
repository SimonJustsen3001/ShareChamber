import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../interfaces/userInterface";
import agent from "../api/agent";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      console.log(user);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
    } catch (error) {
      throw error;
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds);
      console.log(user);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      throw error;
    }
  };
}
