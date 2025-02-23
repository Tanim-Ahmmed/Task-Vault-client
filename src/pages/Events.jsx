import  { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import useTasks from '../hooks/useTasks'
import TaskCard from '../componants/tasks/TaskCard';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../provider/AuthProvider';
function Events() {
  const axiosPublic = useAxiosPublic();
  const {user} = useContext(AuthContext);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: tasks, refetch } = useTasks();
  const  myTasks = tasks?.filter(task => task?.email == user?.email)

  const todoTask = myTasks?.filter(
    (todo) => todo.status === "todo"
  );
  const pendingTask = myTasks?.filter(
    (pending) => pending.status === "pending"
  );
  const doneTask = myTasks?.filter(
    (done) => done.status === "done"
  );

  const handleAddTask = (e) => {
    e.preventDefault();

    const task = {
      time: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: 'todo',
      email: user?.email,
    };

    axiosPublic.post("/tasks", task).then((res) => {
      if (res.data.insertedId) {
        setIsFormOpen(false);
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your note has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  



  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 py-8 max-w-7xl pt-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Board</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
         
            Add Task
          </button>
        </div>

        {isFormOpen && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleAddTask}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  placeholder="Enter task title"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1  lg:grid-cols-3  gap-6 overflow-x-auto pb-6">

        <div>
        <h2 className="sm:w-11/12 sm:pl-16 pt-6 text-lg font-semibold"> ToDo : {todoTask?.length}</h2>
        {todoTask?.length > 0 ? (
          <TaskCard tasks={todoTask} refetch={refetch}></TaskCard>
        ) : (
            <p className="text-red-500 py-4 text-center text-lg"> There is No Task </p>
        )}
      </div>

      <div>
        <h2 className="sm:w-11/12 sm:pl-16 pt-6 text-lg font-semibold"> Pending : {pendingTask?.length}</h2>
        {pendingTask?.length > 0 ? (
          <TaskCard tasks={pendingTask} refetch={refetch}></TaskCard>
        ) : (
            <p className="text-red-500 py-4 text-center text-lg"> There is No Task </p>
        )}
      </div>

      <div>
        <h2 className="sm:w-11/12 sm:pl-16 pt-6 text-lg font-semibold">   Done : {doneTask?.length}</h2>
        {doneTask?.length > 0 ? (
          <TaskCard tasks={doneTask} refetch={refetch}></TaskCard>
        ) : (
            <p className="text-red-500 py-4 text-center text-lg"> There is No Task </p>
        )}
      </div>
        
        </div>
      </div>
    </div>
  );
}

export default Events;
