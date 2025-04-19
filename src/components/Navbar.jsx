import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUser } from "react-icons/fa";
import logo from "../assets/cube.jpg"

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/allCampaign", name: "All Campaign" },
    { path: "form", name: "Add Campaign" },
    { path: "/myCampaign", name: "My Campaign" },
    { path: "/myDonations", name: "My Donations" },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-50 flex justify-between p-4">
        
        <div className="navbar-start">
          <div className="dropdown lg:hidden relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="btn btn-ghost btn-circle transition-transform transform hover:rotate-180"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <ul className="absolute left-0 top-12 bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow-lg">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      className="p-3 block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* Left - Logo */}
        <div className="navbar-start flex items-center gap-2">
          <img
            src= {logo}
            alt="Website Logo"
            className="h-6 w-6 transition-transform duration-300 transform hover:rotate-12"
          />
          <NavLink
            to="/"
            className="text-xl font-bold text-gray-900 hover:text-amber-500 transition-colors"
          >
            Crowdfunding
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex font-bold gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `p-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-amber-500 text-white shadow-md"
                    : "hover:bg-amber-500 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right - User/Login */}
        <div className="navbar-end flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user?.photoURL || "/assets/default-user.jpg"}
                alt="User"
                className="h-8 w-8 rounded-full border-2 border-gray-300"
              />
              <button
                onClick={logOut}
                className="btn btn-ghost text-red-500 hover:bg-red-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FaUser size={28} />
              <NavLink to="/auth/logIn" className="btn btn-primary">
                Login
              </NavLink>
              <NavLink to="/auth/register" className="btn btn-secondary">
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
