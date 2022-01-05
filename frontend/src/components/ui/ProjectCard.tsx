import { Link } from "react-router-dom";
import Project from "../../models/Project";
import { FiCalendar, FiUser } from "react-icons/fi";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { id, name, description, manager, dateCreated } = project;
  return (
    <div className="bg-white rounded-lg shadow-md w-96">
      <div className="px-8 py-4">
        <Link to={`/project/${id}`}>
          <h1 className="text-2xl">{name}</h1>
        </Link>
        <div className="mt-3">
          <span className="text-gray-500">{description}</span>
        </div>
      </div>
      <div className="bg-gray-100 px-8 py-4 flex">
        <span className="flex items-center text-gray-500 gap-2">
          <FiUser /> {`${manager.name} ${manager.lastName}`}
        </span>

        <span className="flex items-center text-gray-500 gap-2 ml-auto">
          <FiCalendar /> {new Date(dateCreated).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
