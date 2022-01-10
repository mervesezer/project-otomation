import Modal, { ModalProps } from "./ui/Modal";
import { useMutation } from "react-query";
import Button from "./ui/Button";
import { Dispatch, SetStateAction, useState } from "react";
import projectService from "../services/projectService";

interface DeleteTaskModalProps extends ModalProps {
  projectId: string;
  taskId: string;
  refetchTasks: () => Promise<void>;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteTaskModal({
  projectId,
  refetchTasks,
  taskId,
  setVisible,
  ...rest
}: DeleteTaskModalProps) {
  const { isLoading, mutateAsync: deleteTask } = useMutation(
    async () => await projectService.deleteTaskByProjectId(projectId, taskId)
  );

  return (
    <Modal label="Görev Sil" {...rest}>
      <h1>
        Görevi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
      </h1>

      <div className="ml-auto flex gap-3">
        <Button
          text="İptal"
          onClick={() => setVisible(false)}
          disabled={isLoading}
        />
        <Button
          text="Sil"
          className="!bg-red-500"
          disabled={isLoading}
          loading={isLoading}
          onClick={async () => {
            await deleteTask();
            await refetchTasks();
            setVisible(false);
          }}
        />
      </div>
    </Modal>
  );
}
