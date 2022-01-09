import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { authUser } = useAuth();
  const [name, setName] = useState(authUser.name);
  const [lastName, setLastName] = useState(authUser.lastName);
  const [email, setEmail] = useState(authUser.email);
  const [password, setPassword] = useState("");

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

        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 ">
            <div>
              <label className="text-gray-700 dark:text-gray-200">Ad</label>
              <Input
                id="username"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">Soyad</label>
              <Input
                id="soyad"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-200">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Yeni Şifre
              </label>
              <Input id="password" type="password" />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Yeni Şifre Tekrar
              </label>
              <Input id="passwordConfirmation" type="password" />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button text="Güncelle" />
          </div>
        </form>
      </section>
    </div>
  );
}
