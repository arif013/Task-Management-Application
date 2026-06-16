import User from "@/types/user";

function ManageUsersClient({ users }: { users: User[] }) {
  return (
    <div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">email</th>
              <th className="px-6 py-3 font-semibold">role</th>
              {/* <th className="px-6 py-3 font-semibold">Priority</th> */}
              <th className="px-6 py-3 font-semibold">Status</th>
              {/* <th className="px-6 py-3 font-semibold">Edit</th> */}
              <th className="px-6 py-3 font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-600">
            {users &&
              users.map((user, index: number) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">{user.role}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {users.map((user, index: number) => (
          <div key={index} className="bg-white rounded-lg border p-4 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-900">{user.username}</h3>
              
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{user.email}</p>
            {/* <div className="flex justify-between text-xs text-gray-500">
              <span>
                Due: {new Date(task.due_date).toLocaleDateString("en-CA")}
              </span>
              <span className="font-medium">{task.priority}</span>
            </div> */}
            {/* <div className="flex gap-2 pt-1">
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
              </button> */}
            <button
                // onClick={() => handleDelete(task.id)}
                className="flex-1 rounded bg-red-500 py-2 px-2 text-sm text-white"
              >
                Delete
              </button>
          </div>
          //   </div>
        ))}
      </div>
    </div>
  );
}

export default ManageUsersClient;
