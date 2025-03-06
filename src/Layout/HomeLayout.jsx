import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <div className="space-y-4">
      <NavBar />
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
