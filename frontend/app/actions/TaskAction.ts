"use server";

import { fetchWithAuth } from "../lib/api";

interface FormData {
  title: string;
  description: string;
  priority: string;
  status: string;
  due_date: string;
}

export async function updateTask(id: number, formData: FormData) {
  const fetchTasks = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    },
  );
  if (!fetchTasks) return { error: "Unauthorized" };
  return { success: true };
}

export async function createTask(formData: FormData) {
  // console.log('formData',formData)
  const newTask = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    },
  );
  if (!newTask) return { error: "Unauthorized" };
  return { success: true };
}

export async function deleteTask(id: number) {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response) {
      return {
        success: false,
        message: "No response from server",
      };
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to delete task",
      };
    }

    return {
      success: true,
      message: data.message || "Task deleted successfully",
    };
  } catch (error) {
    console.error("Delete task error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function changeStatus(status: string) {
  try {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    const response = await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks?${params}`,
      {
        method: "GET",
      },
    );
    if (!response) {
      return {
        success: false,
        message: "No response from server",
      };
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch task with the status",
      };
    }
    return {
      data,
      success: true,
      message: data.message || "Task fetched successfully with the status",
    };
  } catch (error) {
    console.error("Could not fetch the selected tasks");
    return {
      success: false,
      message: "No response from the server",
    };
  }
}
