import { createBrowserRouter, json, redirect } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Home from "./routes/Home.jsx";
import Profile from "./routes/Profile.jsx";
import Login from "./routes/Login.jsx";
import store from "./redux/store.js";
import { checkLoggedIn } from "./utilities/RoutesLoaders.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
        loader: async () => {
          // If already connected, then go to profile page
          const auth = store.getState().auth;
          if (await checkLoggedIn(auth)) return redirect("/profile");
          return true;
        },
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: async () => {
          // If not logged in, then redirect to login page
          const auth = store.getState().auth;
          if (await checkLoggedIn(auth)) return true;
          return redirect("/login");
        },
      },
      {
        path: "/profile/transactions",
      },
    ],
  },
]);

export default router;
