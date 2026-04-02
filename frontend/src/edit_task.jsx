import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "./api"
import "./add_tasks.css"

function EditTask() {
    const { id } = useParams()
    console.log(id);
    const navigate = useNavigate()

    const [task, setTask] = useState({
        title:"",
        description:"",
        status:""
    })

    useEffect(( )=> {
        API.get(`/tasks/get_task/${id}`)
        .then(res => {
            console.log(res);
            setTask({
                title:res.data.title,
                description: res.data.description,
                status: res.data.status
            })
        })
    }, [id])

    const handleChange = (e) => {
        setTask({...task, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await API.patch(`tasks/update/${id}/`, task,{
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            navigate(-1)
        }
        catch (err) {

        }
    }

    return (
        <div className="container">
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit} className="addtask-form">
                <input type="text" name="title" value={task.title} onChange={handleChange} />
                <input type="text" name="description" value={task.description} onChange={handleChange} />
                <input type="text" name="status" value={task.status} onChange={handleChange} />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default EditTask;