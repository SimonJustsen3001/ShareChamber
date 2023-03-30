import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";
import Cookies from "js-cookie";

export default class CommonStore {
  error: ServerError | null = null;
  token: string | undefined = Cookies.get("jwt");
  appLoaded = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token)
          Cookies.set("jwt", token, {
            sameSite: "none",
            secure: true,
            expires: 1 / 48,
          });
        else Cookies.remove("jwt");
      }
    );
  }

  setServerError = (error: ServerError) => {
    this.error = error;
  };

  setToken = (token: string | undefined) => {
    this.token = token;
  };

  setAppLoaded = () => {
    this.appLoaded = true;
  };
}
