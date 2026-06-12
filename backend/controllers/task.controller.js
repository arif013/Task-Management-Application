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
      totalCountResult = await client`
        SELECT COUNT(*) as total FROM tasks 
        WHERE created_by = ${userId};
      `;
    }

    // 3. Extract total number and calculate total pages
    const totalTasks = parseInt(totalCountResult[0].total);
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
      success: true,
      message: "Task fetched successfully!!",
      task: fetchTaskById,
    });
  }
};

export { createTask, getTasks, getSingleTask };
