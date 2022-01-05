import { useAuth } from "../context/AuthContext";


export default function Profile() {
    const { authUser } = useAuth();
    return (
        <div>

            <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <img
                    className="object-cover mx-2 rounded-full h-9 w-9"
                    src={`https://ui-avatars.com/api/?name=${authUser.name}+${authUser.lastName}`}
                    alt="avatar"
                />

                <div className="px-6 py-4">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{authUser.name} {authUser.lastName}</h1>

                    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                        <h1 className="px-2 text-sm">{authUser.email}</h1>
                    </div>
                </div>
            </div>

        </div>
    )
}
