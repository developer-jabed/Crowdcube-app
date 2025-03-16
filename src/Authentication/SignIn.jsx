import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const SignIn = () => {
  const { userLogIn, googleSignIn, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogIn = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const email = form.get("email");
    const password = form.get("password");

    userLogIn(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Login successful!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Invalid email or password. Please try again.");
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        toast.success("Login with Google successful!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error during Google login. Please try again.");
      });
  };

  const handleForgotPassword = () => {
    navigate("/auth/reset-password");
  };

  return (
    <div className="mt-10">
      <ToastContainer />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
            <div className="card-body">
              <h2 className="text-xl font-bold text-center">Login Your Account</h2>
              <form onSubmit={handleLogIn} className="fieldset">
                <label className="fieldset-label text-black font-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required
                />
                <label className="fieldset-label text-black font-bold">Password</label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    className="input"
                    placeholder="Password"
                    required
                  />
                  <span
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute top-3 right-3 cursor-pointer"
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div>
                  <a onClick={handleForgotPassword} className="link link-hover">
                    Forgot password?
                  </a>
                </div>
                <button className="btn font-bold bg-[#753d6f] hover:-translate-y-1 hover:duration-700 hover:bg-amber-500 mt-4">
                  Login
                </button>
              </form>
              <div className="text-center text-sm text-black">
                Do not have an account?{" "}
                <Link
                  to="/signUp"
                  className="link link-hover font-bold text-green-400"
                >
                  Register Now
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center mb-4">
              <button
                onClick={handleGoogleSignIn}
                className="btn text-xl bg-[#db4437] text-white"
              >
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
