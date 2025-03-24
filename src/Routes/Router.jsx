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
import UpdateCampaign from "../Private-Route/UpdateCampaign";
import NotFound from "../components/NotFound";
import MyDonations from "../Private-Route/MyDonations";

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
        path: 'updateCampaign/:id',
        element: <PrivateRoute><UpdateCampaign /></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/campaign/${params.id}`)
      },
      {
        path: "form",
        element: (
          <PrivateRoute>
            <AddCampaign />
          </PrivateRoute>
        ),
      },

      {
        path: '/myDonations' , element: (
          <PrivateRoute>
            <MyDonations></MyDonations>
          </PrivateRoute>
        ),
        loader: () => fetch('http://localhost:5000/donations')
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
  { path: "*", element: <NotFound></NotFound>},
]);

export default Router;
