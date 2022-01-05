import { useState } from "react";
import { useAuth } from "../context/AuthContext";


export default function Ayarlar() {
  const { authUser } = useAuth();
  const [name, setName] = useState(authUser.name);
  const [lastName, setLastName] = useState(authUser.lastName);
  const [email, setEmail] = useState(authUser.email);
  const [password, setPassword] = useState("");
  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-3xl dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
           Profil Ayarları
        </h2>

        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 dark:text-gray-200">Ad</label>
              <input
                id="username"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">Soyad</label>
              <input
                id="soyad"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-200">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">Şifre</label>
              <input
                id="password"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200">
                Şifre Tekrar
              </label>
              <input
                id="passwordConfirmation"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Güncelle
            </button>
          </div>
        </form>
        
      </section>
    </div>
  );
}
