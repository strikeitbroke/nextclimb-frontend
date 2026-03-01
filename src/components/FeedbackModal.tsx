import { useState } from "react";
import api from "../api/axios";
import type { SearchParams } from "../models";

interface FeedbackModalProps {
  searchParams: SearchParams;
  onClose: () => void;
}

export default function FeedbackModal({ searchParams, onClose }: FeedbackModalProps) {
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    await api.post("/segment/feedback", {
      location: searchParams.location,
      radius: searchParams.radius,
      comment: comment.trim(),
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-lg">
        {submitted ? (
          <div className="text-center py-4">
            <p className="text-lg font-semibold text-gray-800">Thanks for your feedback!</p>
            <button
              className="mt-4 text-sm text-gray-500 underline"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Share your thoughts</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
              rows={4}
              placeholder="Tell us about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="text-sm text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="text-sm text-white bg-gray-800 px-4 py-2 rounded-lg disabled:opacity-50"
                onClick={handleSubmit}
                disabled={!comment.trim()}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
