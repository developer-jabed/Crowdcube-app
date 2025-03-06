import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import HomePage from "../Pages/HomePage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [{ path: "/", element: <HomePage></HomePage> }],
  },
  { path: "*", component: () => <h1>Page Not Found</h1> }, // catch-all route for 404s
]);

export default Router;
