import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Store, store } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./Redux/store";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import Signin from "./pages/Signin/Signin";
import Profile from "./pages/Profile/Profile";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
          <Route index element={< Signin/>} />
            <Route exact path = "signin" element={<Signin/>}/>
            <Route path = "user" element={<App/>}>
              <Route index element = {< Home/>} />
              <Route exact path="home" element={<Home />} />
              <Route exact path="explore" element={<Explore />} />
              <Route exact path="profile/:id" element={<Profile />} />
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
