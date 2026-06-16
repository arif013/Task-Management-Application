import { neon } from "@neondatabase/serverless";
const client = neon(process.env.DATABASE_URL);

const getAllUsers = async (req, res) => {
  try {
    const users = await client`
              SELECT * FROM users
          `;
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "Users not found",
      });
    }
    // console.log(`users`,users)
    return res.status(200).json({
      success: true,
      message: "Fetched all users!!",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Server error!!",
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await client`
            SELECT * FROM tasks
        `;
    if (!tasks) {
      return res.status(404).json({
        success: false,
        message: "Could not fetch tasks from admin!!",
      });
    }
    // console.log(`tasks`, tasks);
    return res.status(200).json({
      success: true,
      message: "Fetched all tasks!!",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Server error!!",
    });
  }
};

export { getAllUsers, getAllTasks };
