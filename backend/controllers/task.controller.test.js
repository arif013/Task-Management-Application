import { describe, it, expect, vi, beforeEach } from "vitest";

const mockDbQuery = vi.fn();

vi.mock("@neondatabase/serverless", () => ({
  neon: () => mockDbQuery,
}));

const { createTask } = await import("./task.controller.js");

describe("createTask controller", () => {
  let req, res;

  beforeEach(() => {
    vi.clearAllMocks();
    req = {
      body: {},
      user: { id: 1 },
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  it("should return 400 when title is missing", async () => {
    req.body = { description: "some description" };

    await createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Title and Descriptions are the required fields!!",
    });
  });

  it("should return 400 when description is missing", async () => {
    req.body = { title: "Test Task" };

    await createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Title and Descriptions are the required fields!!",
    });
  });

  it("should return 201 when task is created successfully", async () => {
    const fakeTask = {
      id: 1,
      title: "Test Task",
      status: "Pending",
      due_date: "2025-01-01",
    };

    mockDbQuery.mockResolvedValue([fakeTask]);

    req.body = {
      title: "Test Task",
      description: "Test Description",
      status: "Pending",
      priority: "Medium",
      due_date: "2025-01-01",
    };

    await createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: `Task ${fakeTask.title} created successfully!!`,
      task: fakeTask,
    });
  });
});
