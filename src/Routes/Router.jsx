import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import HomePage from "../Pages/HomePage"; // Import the details page
import PrivateRoute from "./PrivateRoute";
import AuthLayout from "../Layout/AuthLayout";
import SignIn from "../Authentication/SignIn";
import SignUp from "../Authentication/SignUp";
import AddCampaign from "../Private-Route/AddCampaign";
import CampaignDetails from "../Pages/CampaignDetails";
import MyCampaign from "../Private-Route/MyCampaign";
import AllCampaigns from "../Private-Route/AllCampaigns";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "campaign/:_id",
        element: (
          <PrivateRoute>
            <CampaignDetails></CampaignDetails>
          </PrivateRoute>
        ),
      }, // Campaign details page
      {
        path: "myCampaign",
        element: (
          <PrivateRoute>
            <MyCampaign></MyCampaign>
          </PrivateRoute>
        ),
      },
      {
        path: "allCampaign",
        element: (
          <PrivateRoute>
            <AllCampaigns></AllCampaigns>
          </PrivateRoute>
        ),
      },
      {
        path: "form",
        element: (
          <PrivateRoute>
            <AddCampaign />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "/auth/login", element: <SignIn /> },
      { path: "/auth/register", element: <SignUp /> },
    ],
  },
  { path: "*", element: <h1>Page Not Found</h1> },
]);

export default Router;
