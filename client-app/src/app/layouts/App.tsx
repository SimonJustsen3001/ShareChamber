import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import ModalContainer from "../common/modals/ModalContainer";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useStore } from "../stores/store";
import { ToastContainer } from "react-toastify";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@fortawesome/fontawesome-free/css/all.css";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { userStore, commonStore, movieListStore } = useStore();
  const burger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mediaWatcher = window.matchMedia("(max-width: 768px)");
    userStore.setIsSmallScreen(mediaWatcher.matches);
    mediaWatcher.addEventListener("change", (event) => {
      userStore.setIsSmallScreen(event.matches);
    });
  }, []);

  useLayoutEffect(() => {
    if (userStore.isSmallScreen) {
      let ctx = gsap.context(() => {
        const tl = gsap
          .timeline()
          .to(".navbar", { delay: 0, xPercent: 100 })
          .from(burger.current, { x: -35 }, "<")
          .progress(1);
        burger.current?.addEventListener("click", () => {
          tl.reversed(!tl.reversed());
        });
      });
      return () => ctx.revert();
    } else {
      let ctx = gsap.context(() => {});
    }
  }, [userStore.isSmallScreen]);

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [userStore, commonStore]);

  useEffect(() => {
    if (userStore.user) movieListStore.loadMovieLists();
  }, [movieListStore, userStore.user]);

  return (
    <>
      <ModalContainer />
      <ToastContainer position="bottom-right" theme="colored" />
      <button ref={burger} className="fa fa-bars burger-menu"></button>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default observer(App);
