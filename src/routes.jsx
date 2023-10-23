import { createBrowserRouter, json, redirect } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Home from "./routes/Home.jsx";
import Profile from "./routes/Profile.jsx";
import Login from "./routes/Login.jsx";
import axios from "axios";
import store from "./redux/store.js";

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
        action: async ({ request, params }) => {
          switch (request.method) {
            case "POST": {
              const formData = await request.formData();

              let payload = {
                email: formData.get("email"),
                password: formData.get("password"),
              };

              const res = await axios.post(
                "http://localhost:3001/api/v1/user/login",
                payload,
              );

              if (res.status === 200 && res.data.status === 200) {
                const data = res.data;

                const token = data.body.token;

                return true;
              }
            }
          }
          throw new json({}, 404);
        },
      },
      {
        path: "/logout",
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: async () => {
          const auth = store.getState().auth;

          if (
            auth.userInfo !== null &&
            typeof auth.userInfo === "object" &&
            auth.userToken !== null
          ) {
            // Check if token is correct
            const headers = {
              headers: {
                Authorization: `Bearer ${auth.userToken}`,
              },
            };

            const userInfos = await axios.post(
              `http://localhost:3001/api/v1/user/profile`,
              {},
              headers,
            );

            if (userInfos.data.status === 200) return true;
          }

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
