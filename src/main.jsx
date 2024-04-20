import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutPage from "./pages/LayoutPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthCheck from "../routes/AuthCheck";
import SuspensePage from "./pages/SuspensePage";
import HomePage from "./pages/HomePage";
import ErrorBoundary from "./pages/ErrorBoundary";

const BlogDetailPage = React.lazy(() => import("./pages/BlogDetailPage"));
const UserProfilePage = React.lazy(() => import("./pages/UserProfilePage"));
const Create_Blog = React.lazy(() => import("./pages/Create_Blog"));
const Edit_Blog = React.lazy(() => import("./pages/Edit_Blog"));
const Create_Tag = React.lazy(() => import("./pages/Create_Tag"));
const TagDetailPage = React.lazy(() => import("./pages/TagDetailPage"));
const AllTopics = React.lazy(() => import("./pages/AllTopics"));
const AllUsers = React.lazy(() => import("./pages/AllUsers"));

export const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: (
          <ErrorBoundary>
            <HomePage />
          </ErrorBoundary>
        ),
        children: [
          {
            index: true,
            element: (
              <ErrorBoundary>
                <AuthCheck />
              </ErrorBoundary>
            ),
          },
        ],
      },
      {
        path: "/blogs/:blogId",
        element: (
          <Suspense fallback={<SuspensePage />}>
            <ErrorBoundary>
              <BlogDetailPage />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/tags/:tagId",
        element: (
          <Suspense fallback={<SuspensePage />}>
            <ErrorBoundary>
              <TagDetailPage />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/users/:usersId",
        element: (
          <Suspense fallback={<SuspensePage />}>
            <ErrorBoundary>
              <UserProfilePage />
            </ErrorBoundary>
          </Suspense>
        ),
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
            <Suspense fallback={<SuspensePage />}>
              <ErrorBoundary>
                <Create_Blog />
              </ErrorBoundary>
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-blog/:blogId",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<SuspensePage />}>
              <ErrorBoundary>
                <Edit_Blog />
              </ErrorBoundary>
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-tag/",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<SuspensePage />}>
              <ErrorBoundary>
                <Create_Tag />
              </ErrorBoundary>
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/tags",
        element: (
          <Suspense fallback={<SuspensePage />}>
            <ErrorBoundary>
              <AllTopics />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/users",
        element: (
          <Suspense fallback={<SuspensePage />}>
            <ErrorBoundary>
              <AllUsers />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/tagdetail/:tagId",
        element: (
          <Suspense fallback={<SuspensePage />}>
            <ErrorBoundary>
              <TagDetailPage />
            </ErrorBoundary>
          </Suspense>
        ),
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
