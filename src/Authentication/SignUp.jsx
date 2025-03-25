import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../Provider/AuthProvider";

const SignUp = () => {
  const { createNewUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const displayName = form.get("displayName");
    const email = form.get("email");
    const photoURL = form.get("photo");
    const password = form.get("password");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        '🦄 "Password must be at least 6 characters long and include both uppercase and lowercase letters."!',
        { position: "top-center", autoClose: 5000 }
      );
      return;
    }

    createNewUser(email, password,photoURL, displayName)
      .then((result) => {
        const user = result.user;

  
        return updateProfile(user, {
          displayName: displayName,
          photoURL: photoURL,
        }).then(() => {
          setUser({ ...user, displayName, photoURL });
          console.log("User updated:", { displayName, photoURL });

          toast.success("🦄 Account created successfully!!", {
            position: "top-center",
            autoClose: 5000,
          });

          navigate("/");
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error: " + error.message, { position: "top-center" });
      });
  };


  return (
    <div className="mt-10">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        transition={Bounce}
      />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
            <div className="card-body">
              <h1 className="text-xl font-bold">Sign Up Your Account</h1>

              <form onSubmit={handleSubmit} className="fieldset">
                <label className="fieldset-label font-bold text-black">
                  Name
                </label>
                <input
                  name="displayName"
                  type="text"
                  className="input"
                  placeholder="Name"
                  required
                />

                <label className="fieldset-label font-bold text-black">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                  required
                />

                <label className="fieldset-label font-bold text-black">
                  Photo URL
                </label>
                <input
                  name="photoURL"
                  type="text"
                  className="input"
                  placeholder="Photo URL"
                />

                <label className="fieldset-label font-bold text-black">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    className="input"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-xl"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <button className="btn font-bold btn-neutral mt-4">
                  Register
                </button>
              </form>

              <div className="text-center text-sm text-black">
                Already have an account?{" "}
                <Link className="text-green-500 font-bold" to="/auth/login">
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
