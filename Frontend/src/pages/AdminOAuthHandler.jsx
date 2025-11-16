// src/pages/AdminOAuthHandler.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../ApiBase";

export default function AdminOAuthHandler() {
  const nav = useNavigate();
  const [msg, setMsg] = useState("Signing you in…");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // If server redirected with an error query param, show it
    if (params.has("oauth")) {
      const code = params.get("oauth");
      if (code === "unauthorized") {
        setMsg("Your Google account is not authorized for admin access.");
        return;
      }
      if (code === "fail" || code === "fail_no_email" || code === "error") {
        setMsg("Google sign-in failed. Please try again.");
        return;
      }
    }

    const token = params.get("token");
    if (token) {
      try {
        setAuthToken(token);
        params.delete("token");
        const clean = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
        window.history.replaceState({}, "", clean);

        nav("/admin");
      } catch (err) {
        console.error("Failed to store token", err);
        setMsg("Sign-in succeeded but storing token failed.");
      }
    } else {
      if (msg === "Signing you in…") setMsg("No token found — sign-in failed.");
    }
  }, [nav]);

  return (
    <div className="max-w-md mx-auto p-8 text-center">
      <h2 className="text-xl font-semibold mb-3">Admin OAuth</h2>
      <p>{msg}</p>
      <div className="mt-4">
        <a href="/admin/login" className="text-blue-600">Go to Admin Login</a>
      </div>
    </div>
  );
}
