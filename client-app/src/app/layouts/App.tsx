import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import ModalContainer from "../common/modals/ModalContainer";
import { useEffect, useLayoutEffect } from "react";
import { useStore } from "../stores/store";
import { ToastContainer } from "react-toastify";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { userStore, commonStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [userStore, commonStore]);

  return (
    <>
      <ModalContainer />
      <ToastContainer position="bottom-right" theme="colored" />
      <NavBar />
      <Outlet />
    </>
  );
}

export default observer(App);
