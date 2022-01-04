import { useQuery } from "react-query";
import ProjectCard from "../components/ui/ProjectCard";
import projectService from "../services/projectService";

export default function Projects() {
  const { isLoading, error, data } = useQuery(
    "projects_query",
    async () => await projectService.findAll()
  );

  return (
    <div>
      <h1>Projects</h1>

      {isLoading ? (
        <h1>Yükleniyor</h1>
      ) : (
        data.map((item) => <ProjectCard project={item} />)
      )}
    </div>
  );
}
