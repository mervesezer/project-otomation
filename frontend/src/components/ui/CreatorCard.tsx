import { FiMail, FiMapPin } from "react-icons/fi";

interface CreatorsProps {
  image: string;
  name: string;
  no: string;
  location: string;
  email: string;
}

export default function Creators({
  email,
  image,
  location,
  name,
  no,
}: CreatorsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg max-w-xs">
      <img className="object-cover object-center" alt="avatar" src={image} />

      <div className="px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">{name}</h1>
        <p className="py-2 text-gray-700 dark:text-gray-400">{no}</p>

        <div className="flex items-center mt-4 text-gray-700">
          <FiMapPin />

          <h1 className="px-2 text-sm">{location}</h1>
        </div>

        <div className="flex items-center mt-4 text-gray-700">
          <FiMail />

          <h1 className="px-2 text-sm">{email}</h1>
        </div>
      </div>
    </div>
  );
}
