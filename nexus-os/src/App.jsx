/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./features/public-pages/HomePage";
import ProjectRequestForm from "./features/public-pages/ProjectRequestForm";
import Login from "./features/public-pages/Login";
import AdminDashboard from "./features/admin-dashboard/AdminDashboard";
import ProjectsBoard from "./features/projects/ProjectsBoard";
import RequestsInbox from "./features/requests/RequestsInbox";
import ClientsList from "./features/clients/ClientsList";
import CandidatesList from "./features/candidates/CandidatesList";
import ClientView from "./features/client-portal/ClientView";
import ProtectedRoute from "./app/ProtectedRoute";
import RoleGate from "./app/RoleGate";
import AppLayout from "./app/AppLayout";
import ClientLayout from "./app/ClientLayout";
import { Toaster } from "react-hot-toast";
import PublicLayout from "./app/PublicLayout";
import SignupClientPage from "./features/public-pages/SignupClientPage";
import SignupDeveloperPage from "./features/public-pages/SignupDeveloperPage";
import DeveloperView from "./features/developer-portal/DeveloperView";

const routes = createBrowserRouter([
  // ۱. صفحات عمومی (بدون محافظت)
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/request-project", element: <ProjectRequestForm /> },
      { path: "/login", element: <Login /> },
      { path: "signup/client", element: <SignupClientPage /> },
      { path: "signup/developer", element: <SignupDeveloperPage /> },
    ],
  },

  // ۲. پنل ادمین (محافظت دوگانه)
  {
    path: "/app",
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleGate />, // ← اضافه شد
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: "admin", element: <AdminDashboard /> },
              { path: "projects", element: <ProjectsBoard /> },
              { path: "requests", element: <RequestsInbox /> },
              { path: "clients", element: <ClientsList /> },
              { path: "candidates", element: <CandidatesList /> },
            ],
          },
        ],
      },
    ],
  },

  // ۳. پورتال مشتری (محافظت دوگانه)
  {
    path: "/client-dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleGate />, // ← اضافه شد
        children: [
          {
            element: <ClientLayout />,
            children: [{ index: true, element: <ClientView /> }],
          },
        ],
      },
    ],
  },

  // ۴. پورتال توسعه‌دهنده (محافظت دوگانه)
  {
    path: "/dev-dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleGate />, // ← اضافه شد
        children: [{ index: true, element: <DeveloperView /> }],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
