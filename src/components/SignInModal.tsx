import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const { login } = useAuth();

  const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
    if (!credentialResponse.credential) {
      console.error("No credential received");
      return;
    }
    try {
      await login(credentialResponse.credential);
      onClose();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
          Sign In
        </h2>

        <div className="space-y-3 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.error("Google login error")}
            size="large"
            width="300"
          />
        </div>
      </div>
    </div>
  );
}
