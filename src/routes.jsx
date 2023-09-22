import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Home from "./routes/Home.jsx";
import Profile from "./routes/Profile.jsx";

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
        path: "/sign-in",
      },
      {
        path: "/sign-out",
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/profile/:id/edit",
      },
      {
        path: "/profile/:id/transactions",
      },
    ],
  },
]);

export default router;
