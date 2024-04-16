import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutPage from "./pages/LayoutPage";
import HomePage from "./pages/HomePage";
import BlogDetailPage from "./pages/BlogDetailPage";
import TagDetailPage from "./pages/TagDetailPage";
import UserProfilePage from "./pages/UserProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PageNotFound from "./pages/PageNotFound";
import Create_Blog from "./pages/Create_Blog";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Edit_Blog from "./pages/Edit_Blog";
import Create_Tag from "./pages/Create_Tag";
import AllTopics from "./pages/AllTopics";
import AllUsers from "./pages/AllUsers";
import AuthCheck from "../routes/AuthCheck";

export const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            index: true,
            element: <AuthCheck />,
          },
        ],
      },
      {
        path: "/blogs/:blogId",
        element: <BlogDetailPage />,
      },
      { path: "/tags/:tagId", element: <TagDetailPage /> },
      {
        path: "/users/:usersId",
        element: <UserProfilePage />,
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        ),
      },
      {
        path: "/create-blog",
        element: (
          <ProtectedRoute>
            <Create_Blog />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-blog/:blogId",
        element: (
          <ProtectedRoute>
            <Edit_Blog />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-tag/",
        element: (
          <ProtectedRoute>
            <Create_Tag />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tags",
        element: <AllTopics />,
      },
      {
        path: "/users",
        element: <AllUsers />,
      },
      {
        path: "/tagdetail/:tagId",
        element: <TagDetailPage />,
      },
    ],
  },
  { path: "/*", element: <PageNotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
