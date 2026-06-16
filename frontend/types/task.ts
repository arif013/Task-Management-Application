interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: Date;
  priority: string;
}

export default Task;
