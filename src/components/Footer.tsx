import { useState } from "react";
import api from "../api/axios";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSignup = async () => {
    if (!email.trim()) return;
    if (!isValidEmail(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      await api.post("/segment/newsletter/signup", { email: email.trim() });
      setSubmitted(true);
      setError("");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="col-span-12 mt-12 border-t border-gray-200 py-10 px-4">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-lg font-bold text-gray-800 mb-1">Stay in the loop</p>
        <p className="text-sm text-gray-500 mb-6">
          NextClimb is just getting started. Get notified when new features launch —
          no spam, just updates for people who love to climb.
        </p>
        {submitted ? (
          <p className="text-sm text-green-600 font-medium">You're on the list. Thanks!</p>
        ) : (
          <>
            <div className="flex gap-2 justify-center">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <button
                onClick={handleSignup}
                disabled={!email.trim()}
                className="bg-gray-800 text-white text-sm px-4 py-2 rounded-lg disabled:opacity-50"
              >
                Notify Me
              </button>
            </div>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            <p className="text-xs text-gray-400 mt-3">We'll only reach out when there's something worth sharing.</p>
          </>
        )}
      </div>
    </footer>
  );
}
