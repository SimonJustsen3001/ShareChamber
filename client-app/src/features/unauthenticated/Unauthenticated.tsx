import { observer } from "mobx-react-lite";
import "./Unauthenticated.Module.css";
import { useStore } from "../../app/stores/store";
import LoginForm from "../form/LoginForm";
import RegisterForm from "../form/RegisterForm";

interface Props {
  message: string;
  loginRequired: boolean;
}

export default observer(function Unauthenticated(props: Props) {
  const { modalStore, userStore } = useStore();
  return (
    <div className="unauthorized-overview">
      <div className="unauthorized-info-container">
        <div className="unauthorized-header">
          You are not currently logged in
        </div>
        <div className="unauthorized-message">{props.message}</div>
        <div className="unauthorized-submessage">
          {!props.loginRequired
            ? "Searching for movies anonymously is limited"
            : "Apologies, please log in to access movie lists"}
        </div>

        <div className="unauthorized-button-container">
          {!props.loginRequired ? (
            <button
              className="unauthorized-consent-button"
              onClick={() => userStore.setSearchAnonymous(true)}
            >
              I understand, let me search
            </button>
          ) : (
            <>
              {" "}
              <button
                className="unauthorized-login-button"
                onClick={() => modalStore.openModal(<LoginForm />)}
              >
                Login
              </button>
              <button
                className="unauthorized-register-button"
                onClick={() => modalStore.openModal(<RegisterForm />)}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
