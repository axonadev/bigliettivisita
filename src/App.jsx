import React, { useEffect } from "react";
import "./App.css";

import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import InvisibleRoutesIfAuth from "./routes/InvisibleRoutesIfAuth.jsx";

//React router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Loader from "./components/Loader.jsx";

//Pages
import Homepage from "./pages/Homepage.jsx";
const Dashboard = React.lazy(() => import("./pages/protected/Dashboard.jsx"));

import ScrollToTop from "./components/ScrollToTop.jsx";

import PostRegistration from "./utility/PostRegistration";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
};

function App() {
  const Token = localStorage.getItem("axo_token");
  const AZIENDA = import.meta.env.VITE_AZIENDA;

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker
        .register("/service-worker.js", {
          scope: "/",
          type: "classic",
        })
        .then(function (registration) {
          console.log("Service Worker registrato con successo:", registration);

          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
          });
        })
        .then(function (subscription) {
          // Invia la sottoscrizione al backend

          localStorage.setItem(
            "axo_P256DH",
            JSON.parse(JSON.stringify(subscription))?.keys?.p256dh
          );
          localStorage.setItem(
            "axo_Auth",
            JSON.parse(JSON.stringify(subscription))?.keys?.auth
          );
          localStorage.setItem(
            "axo_endpoint",
            JSON.parse(JSON.stringify(subscription))?.endpoint
          );
        });
    }
  }, []);

  const { registraDispositivo } = PostRegistration();

  useEffect(() => {
    registraDispositivo(
      localStorage.getItem("axo_endpoint"),
      localStorage.getItem("axo_P256DH"),
      localStorage.getItem("axo_Auth"),
      Token,
      26,
      AZIENDA
    );
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route element={<InvisibleRoutesIfAuth />}>
            <Route path="/login" element={<Homepage />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
