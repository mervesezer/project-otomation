import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import projectService from "../services/projectService";

export default function Project() {
  const { id } = useParams();
  const { isLoading: isProjectDataLoading, data: projectdata } = useQuery(
    `project-${id}`,
    async () => await projectService.findById(id)
  );
  const {} = useQuery(`project-tasks-${id}`);

  if (isProjectDataLoading) {
    return null;
  }

  const { name, manager, description, dateCreated } = projectdata;

  return (
    <div className="flex">
      <div className="flex-1">
        <h1 className="text-4xl mb-3">{name}</h1>
        <span className="text-gray-500">{description}</span>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl">Proje Sahibi</h1>
          <span>{`${manager.name} ${manager.lastName}`}</span>
        </div>
        <div>
          <h1 className="text-xl">Oluşturulma Tarihi</h1>
          <span>{new Date(dateCreated).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
