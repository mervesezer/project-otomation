import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import ProjectCard from "../components/ui/ProjectCard";
import { useAuth } from "../context/AuthContext";
import CreateProjectRequest from "../models/CreateProjectRequest";
import projectService from "../services/projectService";

export default function Projects() {
  const { authUser } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [isAddProjectModalVisible, setIsAddProjectModalVisible] =
    useState(false);

  const { isLoading, error, data, refetch } = useQuery(
    "projects_query",
    async () => await projectService.findAll()
  );

  const { isLoading: isProjectCreating, mutateAsync } = useMutation(
    async (createProjectRequest: CreateProjectRequest) =>
      await projectService.save(createProjectRequest)
  );

  return (
    <>
      {authUser.type === "manager" ? (
        <Button
          text="Proje Oluştur"
          className="mb-5 ml-auto"
          onClick={() => setIsAddProjectModalVisible(!isAddProjectModalVisible)}
        />
      ) : null}
      <div className="flex flex-wrap justify-center gap-10 mb-10">
        {isLoading ? (
          <h1>Yükleniyor</h1>
        ) : (
          data.map((item) => <ProjectCard key={item.id} project={item} />)
        )}
      </div>

      {authUser.type === "manager" ? (
        <Modal
          visible={isAddProjectModalVisible}
          label="Proje Oluştur"
          onClickX={() => setIsAddProjectModalVisible(false)}
        >
          <form
            className="flex flex-col gap-3"
            onSubmit={async (e) => {
              e.preventDefault();
              await mutateAsync({ name, description, managerId: authUser.id });
              refetch();
              setName("");
              setDescription("");
              setIsAddProjectModalVisible(false);
            }}
          >
            <Input
              placeholder="İsim"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Açıklama"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              className="w-full"
              text="Ekle"
              disabled={isProjectCreating}
              loading={isProjectCreating}
            />
          </form>
        </Modal>
      ) : null}
    </>
  );
}
