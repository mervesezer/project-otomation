import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import AddTaskModal from "../components/AddTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";
import Button from "../components/ui/Button";
import UpdateTaskModal from "../components/UpdateTaskModal";
import { useAuth } from "../context/AuthContext";
import projectService from "../services/projectService";

export default function Project() {
  const { authUser } = useAuth();
  const { id } = useParams();
  const { isLoading: isProjectDataLoading, data: projectdata } = useQuery(
    `project-${id}`,
    async () => await projectService.findById(id)
  );
  const {
    isLoading: isTasksLoading,
    data: tasksData,
    refetch: refetchTasks,
  } = useQuery(
    `project-tasks-${id}`,
    async () => await projectService.findAllTasks(id)
  );

  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const [deleteTaskModalVisible, setDeleteTaskModalVisible] = useState(false);
  const [updateTaskModalVisible, setUpdateTaskModalVisible] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState<string>(null);
  const [taskIdToUpdate, setTaskIdToUpdate] = useState<string>(null);

  if (isProjectDataLoading || isTasksLoading) {
    return null;
  }

  const { name, manager, description, dateCreated } = projectdata;

  return (
    <>
      <div className="flex">
        <div className="flex-1 pr-5">
          <h1 className="text-4xl mb-3">{name}</h1>
          <span className="text-gray-500">{description}</span>

          <div className="flex w-full">
            <h1 className="text-2xl mt-5">Görevler</h1>

            {authUser.type === "manager" ? (
              <Button
                text="Görev Ekle"
                className="ml-auto"
                onClick={() => setAddTaskModalVisible(true)}
              />
            ) : null}
          </div>

          <div className="flex flex-col mt-5 max-h-full">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 max-h-full">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 max-h-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Çalışan
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          İsim
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Açıklama
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Durum
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tasksData.map(
                        ({
                          id: taskId,
                          name,
                          description,
                          employee,
                          completed,
                        }) => (
                          <tr key={taskId}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={`https://ui-avatars.com/api/?name=${employee.name}+${employee.lastName}&background=random`}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {`${employee.name} ${employee.lastName}`}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {employee.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                <Link
                                  to={`/project/${id}/task/${taskId}`}
                                  className="hover:underline"
                                >
                                  {name}
                                </Link>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${
                                  completed ? "bg-green-500" : "bg-red-500"
                                }`}
                              >
                                {completed ? "Tamamlandı" : "Tamamlanmadı"}
                              </span>
                            </td>
                            {authUser.type === "manager" ? (
                              <>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button
                                    className="text-blue-600 hover:text-blue-900"
                                    onClick={() => {
                                      setTaskIdToUpdate(taskId);
                                      setUpdateTaskModalVisible(true);
                                    }}
                                  >
                                    <FiEdit size={20} />
                                  </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button
                                    className="text-red-600 hover:text-red-900"
                                    onClick={() => {
                                      setTaskIdToDelete(taskId);
                                      setDeleteTaskModalVisible(true);
                                    }}
                                  >
                                    <FiTrash2 size={20} />
                                  </button>
                                </td>
                              </>
                            ) : null}
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                  {tasksData.length < 1 ? (
                    <h1 className="text-xl text-gray-500 text-center my-5">
                      Görev Yok
                    </h1>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
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

      {authUser.type === "manager" ? (
        <>
          <AddTaskModal
            visible={addTaskModalVisible}
            onClickX={() => setAddTaskModalVisible(false)}
            projectId={id}
            refetchTasks={async () => {
              await refetchTasks();
            }}
            setVisible={setAddTaskModalVisible}
          />
          <DeleteTaskModal
            visible={deleteTaskModalVisible}
            onClickX={() => setDeleteTaskModalVisible(false)}
            projectId={id}
            taskId={taskIdToDelete}
            refetchTasks={async () => {
              await refetchTasks();
            }}
            setVisible={setDeleteTaskModalVisible}
          />
          <UpdateTaskModal
            visible={updateTaskModalVisible}
            onClickX={() => setUpdateTaskModalVisible(false)}
            projectId={id}
            refetchTasks={async () => {
              await refetchTasks();
            }}
            setVisible={setUpdateTaskModalVisible}
            taskIdToUpdate={taskIdToUpdate}
          />
        </>
      ) : null}
    </>
  );
}
