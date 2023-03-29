import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import ModalContainer from "../common/modals/ModalContainer";

function App() {
  return (
    <>
      <ModalContainer />
      <NavBar />

      <Outlet />
    </>
  );
}

export default observer(App);
