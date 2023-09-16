import React from "react";
import "./App_test.css";
import {
  Router,
  Link,
  Route,
  Routes,
  NavLink,
  useLocation,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Sidebar from "./Layouts/Sidebar/Sidebar";
import MidComponent from "./Layouts/MidComponent/MidComponent";
import RightSideBar from "./Layouts/RightSideBar/RightSideBar";
import MidComponent_test from "./Layouts/MidComponent/MidComponent_test";
import Explore from "./pages/Explore/Explore";
import SidebarMain from "./Layouts/Sidebar/SidebarMain";
import Signin from "./pages/Signin/Signin";
import Error from "./pages/Error/Error";

export default function App_test() {
  const location = useLocation();

  return (
    <div className="MainPage">
      <div>
        <SidebarMain location={location} />
      </div>
      <div className="Contents">
        <div className="MainContent">
          <Outlet/>
        </div>
        <div id="WhatsNew" style={{ border: "2px solid blue",flex:"2" }}>
          <RightSideBar />
        </div>
      </div>
    </div>
  );
}
