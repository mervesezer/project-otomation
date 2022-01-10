import Dropdown from "./ui/SelectEmployeeDropdown";
import Input from "./ui/Input";
import Modal, { ModalProps } from "./ui/Modal";
import employeeService from "../services/employeeService";
import { useMutation, useQuery } from "react-query";
import Button from "./ui/Button";
import { Dispatch, SetStateAction, useState } from "react";
import projectService from "../services/projectService";
import CreateTaskRequest from "../models/CreateTaskRequest";

interface UpdateTaskModalProps extends ModalProps {
  projectId: string;
  refetchTasks: () => Promise<void>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  taskIdToUpdate: string;
}

export default function UpdateTaskModal({
  projectId,
  refetchTasks,
  setVisible,
  taskIdToUpdate,
  ...rest
}: UpdateTaskModalProps) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { isLoading: isEmployeesLoading, data: employeesData } = useQuery(
    `employees`,
    async () => await employeeService.findAll()
  );

  const { isLoading: isUpdating, mutateAsync: updateTask } = useMutation(
    async (createTaskRequest: CreateTaskRequest) =>
      await projectService.updateTask(
        projectId,
        taskIdToUpdate,
        createTaskRequest
      )
  );

  return (
    <Modal label="Görev Güncelle" {...rest}>
      <form
        className="flex flex-col gap-3"
        onSubmit={async (e) => {
          e.preventDefault();

          await updateTask({
            name,
            description,
            employeeId: selectedEmployeeId,
          });

          setDescription("");
          setName("");
          setSelectedEmployeeId(null);

          await refetchTasks();
          setVisible(false);
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
        <Dropdown
          data={isEmployeesLoading ? [] : employeesData}
          onSelect={(id) => setSelectedEmployeeId(id)}
        />
        <Button text="Güncelle" disabled={isUpdating} loading={isUpdating} />
      </form>
    </Modal>
  );
}
