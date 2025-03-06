import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [user, setUser] = useState(null); // Track user information

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/allCampaign", name: "All Campaign" },
    { path: "/addNewCampaign", name: "Add New Campaign" },
    { path: "/myCampaign", name: "My Campaign" },
    { path: "/myDonations", name: "My Donations" },
  ];

  useEffect(() => {
    // Check if user is logged in (simulate with localStorage or any authentication mechanism)
    const storedUser = localStorage.getItem("user"); // Simulated login check
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

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
      <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-50 flex justify-between p-4 transition-all duration-300">
        {/* Left - Logo and Website Name */}
        <div className="navbar-start flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
          <img
            src="/public/asset/cube.jpg" // Replace with the path to your logo image
            alt="Website Logo"
            className="h-8 w-8 transition-transform duration-300 transform hover:rotate-12"
          />
          <NavLink
            to="/"
            className="text-2xl font-bold text-gray-900 hover:text-amber-500 transition-colors duration-300"
          >
            Crowdfunding
          </NavLink>
        </div>

        {/* Left - Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden relative">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent menu from closing immediately
                setIsMenuOpen(!isMenuOpen);
              }}
              className="btn btn-ghost btn-circle transition-transform duration-300 transform hover:rotate-180"
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
              <ul className="absolute left-0 top-12 bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow-lg transition-transform duration-300 transform scale-95 opacity-100">
                {navLinks.map((link) => (
                  <li key={link.path} className="transition-all duration-300 transform hover:translate-x-2">
                    <NavLink
                      to={link.path}
                      className="p-3 rounded-lg block"
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

        {/* Center - Desktop Navigation */}
        <div className="navbar-center hidden lg:flex font-bold gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `p-3 rounded-lg transition-all duration-500 ${
                  isActive
                    ? "bg-amber-500 text-white shadow-md transform scale-105"
                    : "hover:-translate-y-1 hover:bg-amber-500 hover:text-white transform hover:scale-105"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right - User Photo / Login/Register */}
        <div className="navbar-end flex items-center gap-4">
          {isLoggedIn ? (
            // If logged in, display user photo and logout button
            <div className="flex items-center gap-2 transition-all duration-500 transform hover:scale-110 hover:bg-gray-100 p-2 rounded-lg">
              <img
                src={user?.photo || "/path/to/default-user-photo.jpg"} // User photo, fallback to default
                alt="User"
                className="h-8 w-8 rounded-full border-2 border-gray-300 transition-all duration-300 transform hover:scale-110"
              />
              <button
                onClick={handleLogout}
                className="btn btn-ghost text-red-500 hover:bg-red-200 transition-all duration-300 transform hover:scale-110"
              >
                Logout
              </button>
            </div>
          ) : (
            // If not logged in, display login/register buttons
            <div className="flex items-center gap-2 transition-all duration-500 transform hover:scale-110 hover:bg-gray-100 p-2 rounded-lg">
              <NavLink
                to="/login"
                className="btn btn-primary transition-all duration-300 transform hover:scale-110"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-secondary transition-all duration-300 transform hover:scale-110"
              >
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
