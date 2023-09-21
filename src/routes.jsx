import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Home from "./routes/Home.jsx";

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
    ],
  },
]);

export default router;
