"use client";
import {
  changeStatus,
  createTask,
  deleteTask,
  updateTask,
} from "@/app/actions/TaskAction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingButton from "@/app/components/LoadingButton";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: Date;
  priority: string;
}

export default function MyTaskClient({ myTasks }: { myTasks: Task[] }) {
  const router = useRouter();
  const [tasks, setTasks] = useState(myTasks);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [statusChange, setStatusChange] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    due_date: "",
  });

  useEffect(() => {
    setTasks(myTasks);
  }, [myTasks]);
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    let response;

    if (selectedTask) {
      response = await updateTask(selectedTask.id, formData);
    } else {
      response = await createTask(formData);
    }

    if (!response) {
      console.error("Failed to refresh token or fetch failed");
      setIsSubmitting(false);
      return;
    }

    if (response) {
      setIsOpen(false);
      setIsSubmitting(false);
      router.refresh();
    }
  };

  const handleDelete = async (taskId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    setDeletingId(taskId);
    const response = await deleteTask(taskId);

    if (!response) {
      alert("Failed to delete task");
      setDeletingId(null);
      return;
    }

    setDeletingId(null);
    router.refresh();
  };

  useEffect(() => {
    const fetchTasksWithStatus = async () => {
      const response = await changeStatus(statusChange);
      console.log(`response`, response);
      setTasks(response?.data?.tasks ?? []);
    };
    fetchTasksWithStatus();
  }, [statusChange]);
  return (
    <div className="mx-[10px] bg-white h-screen rounded-[10px] py-[10px] px-[10px]">
      <div className="flex justify-end my-[20px]">
        <button
          className="bg-purple-600 text-white px-[20px] py-[10px] rounded-[10px] "
          onClick={() => {
            setSelectedTask(null);
            setFormData({
              title: "",
              description: "",
              priority: "Medium",
              status: "Pending",
              due_date: new Date().toISOString().split("T")[0],
            });
            setIsOpen(!isOpen);
          }}
        >
          + Create Task
        </button>
      </div>
      <div className="flex items-center gap-[10px] my-[10px]">
        <label>Filter</label>
        <select
          className="w-[200px] rounded border-[1px] "
          value={statusChange}
          onChange={(e) => setStatusChange(e.target.value)}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3 font-semibold">Task Title</th>
              <th className="px-6 py-3 font-semibold">Description</th>
              <th className="px-6 py-3 font-semibold">Due Date</th>
              <th className="px-6 py-3 font-semibold">Priority</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Edit</th>
              <th className="px-6 py-3 font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-600">
            {tasks.map((task, index: number) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {task.title}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {task.description}
                </td>
                <td className="px-6 py-4">
                  {new Date(task.due_date).toLocaleDateString("en-CA")}
                </td>
                <td className="px-6 py-4">{task.priority}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${task.status === "Completed" ? "bg-green-100 text-green-800" : ""}
                      ${task.status === "In Progress" ? "bg-blue-100 text-blue-800" : ""}
                      ${task.status === "Pending" ? "bg-amber-100 text-amber-800" : ""}
                    `}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                    onClick={() => {
                      setSelectedTask(task);
                      setFormData({
                        title: task.title,
                        description: task.description,
                        priority: task.priority,
                        status: task.status,
                        due_date: new Date(task.due_date)
                          .toISOString()
                          .split("T")[0],
                      });
                      setIsOpen(true);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4">
                  <LoadingButton
                    onClick={() => handleDelete(task.id)}
                    isLoading={deletingId === task.id}
                    loadingText="Deleting..."
                    className="rounded bg-red-500 px-3 py-1 text-white disabled:opacity-60"
                  >
                    Delete
                  </LoadingButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {myTasks.map((task, index: number) => (
          <div key={index} className="bg-white rounded-lg border p-4 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-900">{task.title}</h3>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap
                  ${task.status === "completed" ? "bg-green-100 text-green-800" : ""}
                  ${task.status === "In Progress" ? "bg-blue-100 text-blue-800" : ""}
                  ${task.status === "Pending" ? "bg-amber-100 text-amber-800" : ""}
                `}
              >
                {task.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {task.description}
            </p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>
                Due: {new Date(task.due_date).toLocaleDateString("en-CA")}
              </span>
              <span className="font-medium">{task.priority}</span>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                className="flex-1 rounded bg-blue-600 py-2 text-sm text-white hover:bg-blue-700"
                onClick={() => {
                  setSelectedTask(task);
                  setFormData({
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    status: task.status,
                    due_date: new Date(task.due_date)
                      .toISOString()
                      .split("T")[0],
                  });
                  setIsOpen(true);
                }}
              >
                Edit
              </button>
              <LoadingButton
                onClick={() => handleDelete(task.id)}
                isLoading={deletingId === task.id}
                loadingText="Deleting..."
                className="flex-1 rounded bg-red-500 py-2 text-sm text-white disabled:opacity-60"
              >
                Delete
              </LoadingButton>
            </div>
          </div>
        ))}
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white p-6">
            <div className="mb-4 flex justify-between">
              <h2 className="text-xl font-semibold">
                {selectedTask ? "Edit Task" : "Create Task"}
              </h2>

              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full rounded border p-2"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                className="w-full rounded border p-2"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />

              <select
                className="w-full rounded border p-2"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value,
                  })
                }
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <select
                className="w-full rounded border p-2"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  })
                }
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <input
                type="date"
                className="w-full rounded border p-2"
                value={formData.due_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    due_date: e.target.value,
                  })
                }
              />

              <LoadingButton
                type="submit"
                isLoading={isSubmitting}
                loadingText={selectedTask ? "Updating..." : "Creating..."}
                className="w-full rounded bg-purple-600 py-2 text-white disabled:opacity-60"
              >
                {selectedTask ? "Update Task" : "Create Task"}
              </LoadingButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
