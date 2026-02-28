import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function StravaCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) {
      setError("No authorization code received from Strava.");
      return;
    }

    api
      .post("/auth/strava/callback", { code })
      .then(() => navigate("/connections"))
      .catch(() => setError("Failed to connect Strava. Please try again."));
  }, [navigate]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            className="text-sm underline"
            onClick={() => navigate("/connections")}
          >
            Go back to Connections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500">Connecting your Strava account...</p>
    </div>
  );
}

export default StravaCallback;
