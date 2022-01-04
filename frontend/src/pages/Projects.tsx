import { useQuery } from "react-query";
import ProjectCard from "../components/ui/ProjectCard";
import projectService from "../services/projectService";

export default function Projects() {
  const { isLoading, error, data } = useQuery(
    "projects_query",
    async () => await projectService.findAll()
  );

  return (
    <div className="flex flex-wrap justify-center gap-10">
      {isLoading ? (
        <h1>Yükleniyor</h1>
      ) : (
        data.map((item) => <ProjectCard key={item.id} project={item} />)
      )}
    </div>
  );
}
