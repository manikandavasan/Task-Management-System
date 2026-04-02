import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "./api"
import "./signin.css"
import Signup from "./signup"
import GetTask from "./get_tasks"

function Signin() {

    const navigate = useNavigate();
    const [userDetail, setUserDetail] = useState({
        username:"",
        password:"",
    })

    const handleChange = (e)=>{
        setUserDetail({...userDetail, [e.target.name] : e.target.value })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            // console.log(userDetail);
            const response = await API.post('signin/', userDetail)
            console.log(response)
            if (response.status === 201) {
                console.log("response", response.user_id);
                // <Link to="/api/signup/">Signin</Link>
                navigate(`/api/tasks/${response.data.user_id}`)
            }
        }
        catch{
        }

    }

    return (
        <div className="container">
            <h1>Signin Form</h1>
            <form onSubmit={handleSubmit} className="signin-form">
                <input type="username" placeholder="Enter your username" name="username" onChange={handleChange} />
                <input type="password" placeholder="Enter password" name="password" onChange={handleChange} />
                <button type="submit">Signin</button>
            </form>
        </div>
    )
}

export default Signin;
