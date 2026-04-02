import { useState, useEffect } from "react";
import API from "./api";
import "./get_task.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

function GetTask() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    // API.get("/tasks/:id")
    console.log("user_id", id);
    API.get(`tasks/${id}`)
    .then((res)=>{
      console.log(res.data);

      setTasks(res.data)
    })
    .catch((err)=>{
      console.error(err)
    })
  }, [id])

  const navigate = useNavigate()

  console.log(tasks)
  console.log(tasks.completed)

  const handleAdd = ()=>{
    navigate(`/api/tasks/create/${id}`)
  }

  const handleDelete =  async (taskId) => {
    try {
      console.log(taskId);
      await API.delete(`tasks/delete/${taskId}/`)
      setTasks(tasks.filter(task => task.id !== taskId))
    }
    catch (err) {
      console.error(err)
    }

  }

  return (
    <div className="container">
      <div className="overall">
        <table className="task-table">
          <thead>
            <tr>
            <th>
              <h3>Title</h3>
            </th>
            <th>
              <h3>Description</h3>
            </th>
            <th>
              <h3>Status</h3>
            </th>
            <th>
              <h3>Edit/Delete</h3>
            </th>
          </tr>
          </thead>

          <tbody>
          {tasks.map((task) => (
              <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td className="edit-delete-btn"><button onClick={()=>{navigate(`/api/tasks/update/${task.id}`)}}> <FaEdit /> </button> <button onClick={() => handleDelete(task.id)}> <FaTrashCan /> </button></td>
            </tr>
          ))}
          </tbody>
        </table>
        <button onClick={handleAdd} className="add-task-btn">Add Task</button>
      </div>
    </div>
  )
}

export default GetTask;