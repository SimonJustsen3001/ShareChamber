import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import "./App.Module.css";

function App() {
  return (
    <>
      <NavBar />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}

export default observer(App);
