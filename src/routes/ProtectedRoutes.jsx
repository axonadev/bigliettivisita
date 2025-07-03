import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { loginByToken } from "../utility/CallLogin";

const ProtectedRoutes = () => {
  const [isGuest, setIsGuest] = useState(null); // <-- null = stato iniziale
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch(); // <-- dispatch non viene utilizzato in questo componente, ma potrebbe essere necessario in futuro

  const sessionToken = localStorage.getItem("axo_token");
  const getLogin = async () => {
    if (!sessionToken) {
      setIsGuest(true);
      setLoading(false);
    } else {
      try {
        const valToken = await loginByToken(dispatch, sessionToken);

        if (!valToken || !valToken.token) {
          localStorage.removeItem("axo_token");
          setIsGuest(true);
        } else {
          localStorage.setItem("axo_token", valToken.token);
          setIsGuest(valToken.guest);
        }
      } catch (error) {
        console.error("LoginByToken error:", error);
        setIsGuest(true);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getLogin();
  }, []);

  if (loading || isGuest === null) return <Loader />; // <-- blocca rendering prematuro

  return isGuest ? <Navigate to="/" replace /> : <Outlet />;
};

export default ProtectedRoutes;
