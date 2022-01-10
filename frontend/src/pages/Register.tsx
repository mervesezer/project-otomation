import { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import RegisterRequest from "../models/RegisterRequest";
import employeeService from "../services/employeeService";
import managerService from "../services/managerService";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("employee");

  const {
    isLoading: isEmployeeRegistering,
    mutateAsync: registerEmployee,
    error: employeeError,
  } = useMutation(
    async (registerRequest: RegisterRequest) =>
      await employeeService.save(registerRequest)
  );

  const {
    isLoading: isManagerRegistering,
    mutateAsync: registerManager,
    error: managerError,
  } = useMutation(
    async (registerRequest: RegisterRequest) =>
      await managerService.save(registerRequest)
  );

  const handleRegister = async () => {
    if (type === "employee") {
      await registerEmployee({ name, lastName, email, password });
    } else if (type === "manager") {
      await registerManager({ name, lastName, email, password });
    }
    alert("Başarıyla Kayıt Oldunuz");
    navigate("/login");
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

          <p className="mt-1 text-center text-gray-500">Aramıza Katıl</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <Input
              placeholder="İsim"
              className="w-full mt-4"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Soyisim"
              className="w-full mt-4"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

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
            <div className="flex gap-3 mt-3">
              <div>
                <input
                  type="radio"
                  id="manager"
                  value="manager"
                  name="type"
                  className="mr-1"
                  checked={type === "manager"}
                  onChange={(e) => setType(e.target.value)}
                />
                <label htmlFor="manager">Yönetici</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="employee"
                  value="employee"
                  name="type"
                  className="mr-1"
                  checked={type === "employee"}
                  onChange={(e) => setType(e.target.value)}
                />
                <label htmlFor="employee">Çalışan</label>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <Button
                text="Üye Ol"
                className="w-full"
                loading={isEmployeeRegistering || isManagerRegistering}
                disabled={isEmployeeRegistering || isManagerRegistering}
              />
            </div>

            <div>
              <Link
                to={"/login"}
                className="w-full flex justify-center items-center text-gray-500 mt-3"
              >
                Zaten üye misin? Giriş Yap.
              </Link>
            </div>

            {/* {managerError || employeeError ? (
              <Alert text={managerError || employeeError} className="mt-3" />
            ) : null} */}
          </form>
        </div>
      </div>
    </div>
  );
}
