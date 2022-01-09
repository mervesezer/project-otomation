import { useAuth } from "../../context/AuthContext";
import { GoProject } from "react-icons/go";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut, FiUser, FiUsers } from "react-icons/fi";
import { ReactNode } from "react";
import { axiosService } from "../../services/axiosService";

interface NavLinkProps {
  to: string;
  text: string;
  icon: ReactNode;
}

function NavLink({ to, text, icon }: NavLinkProps) {
  const { pathname } = useLocation();

  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 text-gray-700 rounded-md ${
        to === pathname ? "bg-gray-200" : null
      }`}
    >
      {icon}
      <span className="mx-4 font-medium">{text}</span>
    </Link>
  );
}

export default function Sidebar() {
  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r fixed">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
        Proje Otomasyonu
      </h2>

      <div className="flex flex-col flex-1 mt-6">
        <nav className="flex flex-col gap-5 flex-1">
          <NavLink to="/" text="Projeler" icon={<GoProject />} />
          <NavLink to="/profile" text="Profil" icon={<FiUser />} />
          <NavLink to="/creators" text="Yapan Kişiler" icon={<FiUsers />} />
        </nav>

        <div className="flex items-center justify-center px-4 -mx-2">
          <img
            className="object-cover mx-2 rounded-full h-9 w-9"
            src={`https://ui-avatars.com/api/?name=${authUser.name}+${authUser.lastName}`}
            alt="avatar"
          />
          <h4 className="mx-2 font-medium text-gray-800">
            {`${authUser.name} ${authUser.lastName}`}
          </h4>
        </div>
        <button
          className="mt-5 text-left flex gap-3 items-center justify-center -mx-2 text-red-500"
          onClick={() => {
            setAuthUser(null);
            axiosService.defaults.headers["Authorization"] = null;
            navigate("/login");
          }}
        >
          <FiLogOut />
          <span>Çıkış Yap</span>
        </button>
      </div>
    </div>
  );
}
