import React from "react";
import "./App.css";
import {
  Router,
  Link,
  Route,
  Routes,
  NavLink,
  useLocation,
  Outlet,
  useNavigate,
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
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function App() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return currentUser ? (
    <div className="MainPage">
      <div className = "SidebarContainer" >
        <SidebarMain location={location} />
      </div>
      <div className="Contents">
        <div className="MainContent" >
          <Outlet />
        </div>
        <div id="WhatsNew" style={{ flex: "2",padding:"5% 1% 5% 1%"}}>
          <RightSideBar />
        </div>
      </div>
    </div>
  ) : (
    <Signin />
  );
}
