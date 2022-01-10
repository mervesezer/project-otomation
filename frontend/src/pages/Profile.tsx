import { useState } from "react";
import { useMutation } from "react-query";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import RegisterRequest from "../models/RegisterRequest";
import employeeService from "../services/employeeService";
import managerService from "../services/managerService";

export default function Profile() {
  const { authUser, setAuthUser } = useAuth();
  const [name, setName] = useState(authUser.name);
  const [lastName, setLastName] = useState(authUser.lastName);
  const [email, setEmail] = useState(authUser.email);
  const [password, setPassword] = useState("");

  const { isLoading: isUpdating, mutateAsync: updateProfile } = useMutation(
    async (registerRequest: RegisterRequest) => {
      if (authUser.type === "employee") {
        await employeeService.update(authUser.id, registerRequest);
      } else {
        await managerService.update(authUser.id, registerRequest);
      }
    }
  );

  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
        <img
          className="mx-auto w-52 mb-5"
          src={`https://ui-avatars.com/api/?name=${authUser.name}+${authUser.lastName}&rounded=true&size=512`}
          alt="avatar"
        />
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Profil Ayarları
        </h2>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const registerRequest: RegisterRequest = {
              name,
              lastName,
              password,
              email,
            };

            if (name === authUser.name || name === "") {
              delete registerRequest.name;
            }
            if (lastName === authUser.lastName || lastName === "") {
              delete registerRequest.lastName;
            }
            if (email === authUser.email || email === "") {
              delete registerRequest.email;
            }
            if (password === "") {
              delete registerRequest.password;
            }

            await updateProfile(registerRequest);

            setAuthUser({
              id: authUser.id,
              dateCreated: authUser.dateCreated,
              name: registerRequest.name || authUser.name,
              lastName: registerRequest.lastName || authUser.lastName,
              email: registerRequest.email || authUser.email,
              type: authUser.type,
            });
          }}
        >
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 ">
            <div>
              <label className="text-gray-700">Ad</label>
              <Input
                id="username"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-700 ">Soyad</label>
              <Input
                id="soyad"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-700 ">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-700 ">Yeni Şifre</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              text="Güncelle"
              loading={isUpdating}
              disabled={isUpdating}
            />
          </div>
        </form>
      </section>
    </div>
  );
}
