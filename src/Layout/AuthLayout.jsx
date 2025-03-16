import { Outlet } from "react-router";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";



const AuthLayout = () => {
  return <div>
    <header>
      <NavBar></NavBar>
    </header>
    
    <Outlet />
    <Footer></Footer>
  </div>;
};

export default AuthLayout;
