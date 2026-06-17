"use client";

import { createTask, deleteTask, updateTask } from "@/app/actions/TaskAction";
import LoadingButton from "@/app/components/LoadingButton";
import Task from "@/types/task";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SortField = "due_date" | "priority" | "title";
type SortOrder = "asc" | "desc";

export default function ManageTaskClient({ tasks: initialTasks }: { tasks: Task[] }) {
  const router = useRouter();
  const [tasks, setTasks] = useState(initialTasks);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortField, setSortField] = useState<SortField>("title");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    due_date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    let response;

    if (selectedTask) {
      response = await updateTask(selectedTask.id, formData);
    } else {
      response = await createTask(formData);
    }

    if (!response) {
      setIsSubmitting(false);
      return;
    }

    setIsOpen(false);
    setIsSubmitting(false);
    router.refresh();
  };

  const handleDelete = async (taskId: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    setDeletingId(taskId);
    const response = await deleteTask(taskId);

    if (!response || !response.success) {
      alert(response?.message || "Failed to delete task");
      setDeletingId(null);
      return;
    }

    setDeletingId(null);
    router.refresh();
  };

  const openCreateModal = () => {
    setSelectedTask(null);
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      due_date: new Date().toISOString().split("T")[0],
    });
    setIsOpen(true);
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      due_date: new Date(task.due_date).toISOString().split("T")[0],
    });
    setIsOpen(true);
  };

  const priorityWeight: Record<string, number> = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !statusFilter || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === "due_date") {
        cmp = new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      } else if (sortField === "priority") {
        cmp = (priorityWeight[a.priority] ?? 0) - (priorityWeight[b.priority] ?? 0);
      } else {
        cmp = a.title.localeCompare(b.title);
      }
      return sortOrder === "asc" ? cmp : -cmp;
    });

  return (
    <div className="mx-[10px] bg-white rounded-[10px] py-[10px] px-[10px]">
      <div className="flex justify-end my-[20px]">
        <button
          className="bg-purple-600 text-white px-[20px] py-[10px] rounded-[10px]"
          onClick={openCreateModal}
        >
          + Create Task
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-[10px] my-[10px]">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[250px] rounded border px-3 py-2 text-sm outline-none focus:border-purple-500"
        />
        <select
          className="w-[180px] rounded border px-3 py-2 text-sm outline-none"
          value={`${sortField}-${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split("-") as [SortField, SortOrder];
            setSortField(field);
            setSortOrder(order);
          }}
        >
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="due_date-asc">Due Date: Earliest</option>
          <option value="due_date-desc">Due Date: Latest</option>
          <option value="priority-desc">Priority: Highest</option>
          <option value="priority-asc">Priority: Lowest</option>
        </select>
        <label className="text-sm text-gray-500">Status:</label>
        <select
          className="w-[160px] rounded border px-3 py-2 text-sm outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
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
              <th className="px-6 py-3 font-semibold">Created By</th>
              <th className="px-6 py-3 font-semibold">Due Date</th>
              <th className="px-6 py-3 font-semibold">Priority</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Edit</th>
              <th className="px-6 py-3 font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-600">
            {filteredTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{task.title}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{task.description}</td>
                <td className="px-6 py-4">{task.creator_username || "—"}</td>
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
                    onClick={() => openEditModal(task)}
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
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg border p-4 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-900">{task.title}</h3>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap
                  ${task.status === "Completed" ? "bg-green-100 text-green-800" : ""}
                  ${task.status === "In Progress" ? "bg-blue-100 text-blue-800" : ""}
                  ${task.status === "Pending" ? "bg-amber-100 text-amber-800" : ""}
                `}
              >
                {task.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
            <div className="text-xs text-gray-500">
              <span>By: {task.creator_username || "—"}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Due: {new Date(task.due_date).toLocaleDateString("en-CA")}</span>
              <span className="font-medium">{task.priority}</span>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                className="flex-1 rounded bg-blue-600 py-2 text-sm text-white hover:bg-blue-700"
                onClick={() => openEditModal(task)}
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

      {/* Modal */}
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
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />

              <textarea
                className="w-full rounded border p-2"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

              <select
                className="w-full rounded border p-2"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <select
                className="w-full rounded border p-2"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <input
                type="date"
                className="w-full rounded border p-2"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
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
