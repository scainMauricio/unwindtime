import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Reset from "./Views/Reset";
import Dashboard from "./Views/Dashboard";
import Unwinds from "./Views/Unwinds";
import UnwindChat from "./Views/UnwindChat";
import AllChats from "./Views/AllChats";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Services/firebase";
import { useDispatch } from "react-redux";
import { findProfile } from "./Services/firestore";
import { loginProfile, changeProfileToken } from "./reducers/profile";
import { addNewFavoArray } from "./reducers/favoRelaxMethods";
import { setLocation } from "./reducers/location";
import React, { useEffect, useState } from "react";
import {
  messaging,
  onMessageListener,
  fetchToken,
} from "./Services/firebaseConnection";
import { getToken, onMessage } from "firebase/messaging";

function App() {
  const [user, loading] = useAuthState(auth);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [show, setShow] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  fetchToken(setTokenFound);

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload.notification?.title!,
        body: payload.notification?.body!,
      });
      setShow(true);
      console.log(payload);
      console.log("Show", show);
      console.log("notifcation", notification);
      console.log("isTokenFound", isTokenFound);
    })
    .catch((err) => console.log("failed: ", err));

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload.notification?.title!,
        body: payload.notification?.body!,
      });
      console.log(payload);
      console.log("notifcation", notification);
    })
    .catch((err) => console.log("failed: ", err));

  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) return;
    fetchProfile();
    getLocation();
    getNotifcationToken();
  }, [user]); //eslint-disable-line

  const fetchProfile = async () => {
    try {
      const profileFound = await findProfile(user!);
      dispatch(loginProfile(profileFound!));
      dispatch(addNewFavoArray(profileFound!.relaxMethods));
    } catch (err) {
      console.error(err);
    }
  };

  const getNotifcationToken = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey:
          "BKzLRtr6U6-LR6IJEd4MxZNDHioh-_y-17RAV9fOtnTAsBElwuTQtQTum8NN0tTDSNa-MO99uSTeBCKOgm1BTyc",
      });
      console.log("token", token);
      dispatch(changeProfileToken(token));
    } catch (err) {
      console.error(err);
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("");
          dispatch(
            setLocation({
              lat: position.coords.latitude as unknown as string,
              lng: position.coords.longitude as unknown as string,
              latitude: position.coords.latitude as unknown as string,
              longitude: position.coords.longitude as unknown as string,
            })
          );
        },
        () => {
          setStatus("Unable to retrieve your location");
          console.log(status);
        }
      );
    }
  };

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
  });

  return (
    <div className="app">
      <Header></Header>
      <Router>
        <div className="main-container">
          <Routes>
            {!user ? (
              <Route path="/" element={<Login />} />
            ) : (
              <Route path="/dashboard" element={<Dashboard />} />
            )}
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            {user ? (
              <Route path="/dashboard" element={<Dashboard />} />
            ) : (
              <Route path="/" element={<Login />} />
            )}
            {user ? (
              <Route path="/unwinds" element={<Unwinds />} />
            ) : (
              <Route path="/" element={<Login />} />
            )}
            {user ? (
              <Route path="/allchats" element={<AllChats />} />
            ) : (
              <Route path="/" element={<Login />} />
            )}
            <Route path="/unwindChat/:unwindID" element={<UnwindChat />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
