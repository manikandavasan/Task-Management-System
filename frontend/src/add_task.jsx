import { useState } from "react"
import API from "./api"
import "./add_tasks.css"
import { useNavigate, useParams } from "react-router-dom"

function AddTask() {
    const { id } = useParams();
    const [Task, setTask] = useState({
        title:"",
        description:"",
        user:id
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setTask({...Task, [e.target.name] : e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            console.log(id);
            const response = await API.post(`tasks/create/${id}`, Task, {
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            navigate(-1)
            // console.log('data sent successfully:', response.data)
            // alert("Form Submitted!")
        }
        catch{
        }
    }
    return (
        <div className="container">
            <h1>Add Task</h1>
            <form onSubmit={handleSubmit} className="addtask-form">
                <input type="text" placeholder="Enter Task Title" name="title" onChange={handleChange}/>
                <input type="text" placeholder="Add Description" name="description" onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
            <h2></h2>
        </div>
    )
}


export default AddTask;