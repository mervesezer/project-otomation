import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import Project from "./pages/Project";
import Creators from "./pages/Creators";
import Task from "./pages/Task";

function RequireAuth({ children }) {
  const { authUser } = useAuth();

  if (authUser === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Projects />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/project/:projectId/task/:taskId" element={<Task />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/creators" element={<Creators />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
