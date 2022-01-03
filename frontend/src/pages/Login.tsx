import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/ui/Alert";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import LoginRequest from "../models/LoginRequest";
import authService from "../services/authService";

export default function Login() {
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const data = await authService.login({ email, password });
      setAuthUser(data.user);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        <div className="px-6 py-4">
          <h2 className="text-3xl font-bold text-center text-gray-700">
            Proje Otomasyonu
          </h2>

          <h3 className="mt-1 text-xl font-medium text-center text-gray-600">
            Hoşgeldiniz
          </h3>

          <p className="mt-1 text-center text-gray-500">Giriş Yap</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <Input
              type="email"
              placeholder="Email"
              aria-label="Email"
              className="w-full mt-4"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Şifre"
              aria-label="Password"
              className="w-full mt-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between mt-4">
              <Button
                text="Giriş Yap"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              />
            </div>

            <div>
              <Link
                to={"/register"}
                className="w-full flex justify-center items-center text-gray-500 mt-3"
              >
                Hala kayıtlı değil misin? Üye ol.
              </Link>
            </div>

            {error ? <Alert text={error} className="mt-3" /> : null}
          </form>
        </div>
      </div>
    </div>
  );
}
