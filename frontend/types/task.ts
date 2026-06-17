interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: Date;
  priority: string;
  created_by: number;
  creator_username?: string;
}

export default Task;
