import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import projectService from "../services/projectService";

export default function Task() {
  const { projectId, taskId } = useParams();
  const { authUser } = useAuth();
  const { data, isLoading, refetch } = useQuery(
    `project_${projectId}_task_${taskId}`,
    async () =>
      await projectService.findTaskByProjectAndTaskId(projectId, taskId)
  );
  const { isLoading: isMutating, mutateAsync } = useMutation(
    async (complete: boolean) => {
      if (complete) {
        await projectService.completeTask(projectId, taskId);
      } else {
        await projectService.incompleteTask(projectId, taskId);
      }
    }
  );

  if (isLoading) return null;

  const { name, description, employee, completed } = data;

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl flex gap-3 items-center">
        {name}
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${
            completed ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {completed ? "Tamamlandı" : "Tamamlanmadı"}
        </span>
      </h1>
      <h2 className="text-gray-500 mt-3 mb-5">{description}</h2>

      <hr />

      <section className="flex flex-col gap-3 my-5">
        <h1 className="text-xl">Çalışan</h1>
        <h2>{`${employee.name} ${employee.lastName}`}</h2>
        <span className="text-gray-500">{employee.email}</span>
      </section>

      {authUser.id === employee.id ? (
        <>
          <hr />
          <div className="mt-5">
            <Button
              text={completed ? "Tamamlanmadı" : "Tamamlandı"}
              className={completed ? "!bg-red-500" : null}
              onClick={async () => {
                if (completed) {
                  await mutateAsync(false);
                } else {
                  await mutateAsync(true);
                }
                await refetch();
              }}
              loading={isLoading || isMutating}
              disabled={isLoading || isMutating}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
