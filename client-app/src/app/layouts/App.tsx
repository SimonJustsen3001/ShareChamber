import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import ModalContainer from "../common/modals/ModalContainer";
import { useEffect } from "react";
import { useStore } from "../stores/store";

function App() {
  const { userStore } = useStore();
  useEffect(() => {
    userStore.getUser();
  }, [userStore]);
  return (
    <>
      <ModalContainer />
      <NavBar />

      <Outlet />
    </>
  );
}

export default observer(App);
