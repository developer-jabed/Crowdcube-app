import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-blue-500 mb-4 animate-bounce">404</h1>
        <h2 className="text-3xl font-semibold text-white mb-2">Oops! Page Not Found</h2>
        <p className="text-gray-400 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
