import { neon } from "@neondatabase/serverless";
const client = neon(process.env.DATABASE_URL);

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;
    if (!title || !description) {
      res
        .status(400)
        .json({ message: "Title and Descriptions are the required fields!!" });
    }
    const [newTask] =
      await client`INSERT INTO tasks (title, description, status, priority, due_date, created_by)
      VALUES ( ${title}, ${description}, ${status}, ${priority}, ${due_date}, ${req.user.id})
      RETURNING id, title, status, due_date
    `;
    res.status(201).json({
      success: true,
      message: `Task ${newTask.title} created successfully!!`,
      task: newTask,
    });
  } catch (error) {
    console.log("Internal server error", error);
    res
      .status(500)
      .json({ message: "Internal server error while creating the task!!" });
  }
};

const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    // 1. Parse pagination values with safe defaults
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 tasks per page
    const offset = (page - 1) * limit; // Calculate how many rows to skip

    let fetchTasks;
    let totalCountResult;

    // 2. Query data and total counts based on whether a status filter is present
    if (status) {
      // Fetch paginated tasks matching status
      fetchTasks = await client`
        SELECT * FROM tasks
        WHERE created_by = ${userId} AND status = ${status}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset};
      `;

      // Get total count matching status (crucial for frontend pagination controls)
      totalCountResult = await client`
        SELECT COUNT(*) as total FROM tasks 
        WHERE created_by = ${userId} AND status = ${status};
      `;
    } else {
      // Fetch all paginated tasks for the user
      fetchTasks = await client`
        SELECT * FROM tasks
        WHERE created_by = ${userId}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset};
      `;

      // Get total count of all user tasks
      [totalCountResult] = await client`
        SELECT COUNT(*) as total FROM tasks 
        WHERE created_by = ${userId};
      `;
    }
    // console.log(`totalCount:`, totalCountResult);

    // 3. Extract total number and calculate total pages
    const totalTasks = parseInt(totalCountResult.total);
    const totalPages = Math.ceil(totalTasks / limit);

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully!!",
      pagination: {
        totalTasks,
        totalPages,
        currentPage: page,
        limit,
      },
      tasks: fetchTasks,
      totalCount: totalCountResult,
    });
  } catch (error) {
    console.error("Fetch tasks failed", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching tasks!!",
    });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    // const userId = req.user.id

    const fetchTaskById = await client`
            SELECT * FROM tasks
            WHERE id = ${id}
        `;
    return res.status(200).json({
      success: true,
      message: "Task fetched successfully!!",
      task: fetchTaskById,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error!!",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, due_date } = req.body;
    const [updatedTask] = await client`
            UPDATE tasks
            SET 
                title = ${title}, 
                description = ${description}, 
                status = ${status}, 
                priority = ${priority}, 
                due_date = ${due_date},
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ${id}
            RETURNING id, title, description, status, priority, due_date;
        `;
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found or update permission denied!!",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Task "${updatedTask.title}" updated successfully!!`,
      task: updatedTask,
    });
  } catch (error) {
    console.error("Update task failed:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating the task!!",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await client`
        DELETE FROM tasks
        WHERE id=${id}
        RETURNING *;
    `;
    if (deletedTask.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found!!",
        task: deletedTask[0],
      });
    }

    return res.status(200).json({
      success: true,
      message: `Task deleted successfully!!`,
      task: deletedTask[0],
    });
  } catch (error) {
    console.error("Could not delete", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const taskCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const [taskCount] = await client`
      SELECT COUNT(*) FROM tasks 
      WHERE id=${userId};
    `;
    console.log("tasks count ", taskCount);
    if (!taskCount) {
      return res
        .status(404)
        .json({ success: false, message: "Tasks not found!!" });
    }
    res.status(200).json({
      success: true,
      message: "Task count fetched successfully",
      data: taskCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error!!" });
  }
};

export {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  taskCount,
};
