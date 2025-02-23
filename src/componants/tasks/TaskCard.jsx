import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";

const TaskCard = ({ tasks, refetch }) => {
  const AxiosPublic = useAxiosPublic();
  const [selectedStatus, setSelectedStatus] = useState("pending");

  const handleOpenModal = (e, task) => {
    e.preventDefault();
    const modal = document.getElementById("update_task");
    if (modal) {
      modal.setAttribute("data-task-id", task._id);
      modal.showModal();
      setSelectedStatus(task.status || "pending");
    }
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    
    const modal = document.getElementById("update_task");
    if (modal) {
      const taskId = modal.getAttribute("data-task-id");

      AxiosPublic.patch(`/tasks/${taskId}`, { title, description, status: selectedStatus })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Task has been updated",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });

      modal.close();
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosPublic.delete(`/tasks/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="bg-white flex justify-between p-4 rounded-lg shadow-md mb-4">
          <div>
            <h4 className="font-medium text-gray-900">{task.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
            <p className="text-sm font-semibold">Status: {task.status}</p>
          </div>
          <div>
            <Link to="#">
              <button className="text-lg text-blue-600 pr-6" onClick={(e) => handleOpenModal(e, task)}>
                <FaRegEdit />
              </button>
            </Link>

            <dialog id="update_task" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="text-lg font-semibold mb-4">Update Task</h3>
                <form method="dialog" onSubmit={handleUpdateTask} className="w-full">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={task.title}
                      placeholder="Title"
                      className="input input-bordered w-full border-2"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>
                    <input
                      type="text"
                      name="description"
                      defaultValue={task.description}
                      placeholder="Description"
                      className="input input-bordered w-full border-2"
                    />
                  </div>

                  {/* Status Selection with Radio Buttons */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Status</span>
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="pending"
                          checked={selectedStatus === "pending"}
                          onChange={() => setSelectedStatus("pending")}
                          className="mr-2"
                        />
                        Pending
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="done"
                          checked={selectedStatus === "done"}
                          onChange={() => setSelectedStatus("done")}
                          className="mr-2"
                        />
                        Done
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button type="button" className="btn btn-neutral" onClick={() => document.getElementById("update_task").close()}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </dialog>

            <button onClick={() => handleDelete(task._id)} className="text-lg text-red-600">
              <MdDeleteForever />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
