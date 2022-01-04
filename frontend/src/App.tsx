import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";

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
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
