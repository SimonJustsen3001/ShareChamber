import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import ModalContainer from "../common/modals/ModalContainer";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useStore } from "../stores/store";
import { ToastContainer } from "react-toastify";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@fortawesome/fontawesome-free/css/all.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { userStore, commonStore } = useStore();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.5 })
        .to(".arrow-animation", { duration: 1, y: 150 })
        .to(".arrow-animation", { duration: 1, y: 0 });
      const tl = gsap.timeline().to(".navbar", { width: 100 }).progress(1);
      const burger = document.querySelector("button");
      burger?.addEventListener("click", () => {
        tl.reversed(!tl.reversed());
      });
    });

    return () => ctx.revert();
  });

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
