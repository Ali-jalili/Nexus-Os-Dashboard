/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./features/public-pages/HomePage";
import JobApplicationForm from "./features/public-pages/JobApplicationForm";
import ProjectRequestForm from "./features/public-pages/ProjectRequestForm";
import Login from "./features/public-pages/Login";
import AdminDashboard from "./features/admin-dashboard/AdminDashboard";
import ProjectsBoard from "./features/projects/ProjectsBoard";
import RequestsInbox from "./features/requests/RequestsInbox";
import ClientsList from "./features/clients/ClientsList";
import CandidatesList from "./features/candidates/CandidatesList";
import ClientView from "./features/client-portal/ClientView";
import ProtectedRoute from "./app/ProtectedRoute";
import AppLayout from "./app/AppLayout";
import ClientLayout from "./app/ClientLayout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/apply-job",
    element: <JobApplicationForm />,
  },
  {
    path: "/request-project",
    element: <ProjectRequestForm />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/app",
    element: <ProtectedRoute />,

    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "admin",
            element: <AdminDashboard />,
          },
          {
            path: "projects",
            element: <ProjectsBoard />,
          },
          {
            path: "requests",
            element: <RequestsInbox />,
          },
          {
            path: "clients",
            element: <ClientsList />,
          },
          {
            path: "candidates",
            element: <CandidatesList />,
          },
        ],
      },
    ],
  },

  {
    path: "/client-dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        element: <ClientLayout />,
        children: [{ index: true, element: <ClientView /> }],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
