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
  const navColors = ["#00BFFF", "#FFA07A", "#90EE90", "#EE82EE", "#FF6347"];

  useLayoutEffect(() => {
    // const sections: HTMLElement[] = gsap.utils.toArray(".section");
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

// gsap
//           .timeline({ repeat: 0, repeatDelay: 1 })
//           .to(".navbar", { opacity: 0.5, duration: 1 })
//           .to(
//             ".navbar",
//             {
//               opacity: 1,
//               backgroundColor: navColors[index],
//               immediateRender: false,
//             },
//             ">"
//           ),
