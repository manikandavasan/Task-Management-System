import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "./api"
import "./signup.css"

function Signup() {
    const navigate = useNavigate();
    const [userDetail, setUserDetail] = useState({
        username:"",
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        confirm_password:""
    })

    // const navigate = useNavigate()
    const handleChange = (e)=>{
        setUserDetail({...userDetail, [e.target.name] : e.target.value })
    }
    // const Navigate_signin = ()=>{
    //     navigate('api/signin')
    // }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            console.log(userDetail);
            const response = await API.post('signup/', userDetail, {
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            navigate("/api/signin/")
        }
        catch{

        }

    }

    return (
        <div className="container">
            <h1>SignUp Form</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <input type="text" placeholder="Enter your username" name="username" onChange={handleChange} />
                <input type="text" placeholder="Enter your firstname" name="firstname" onChange={handleChange} />
                <input type="text" placeholder="Enter your lastname" name="lastname" onChange={handleChange} />
                <input type="email" placeholder="Enter your email" name="email" onChange={handleChange} />
                <input type="password" placeholder="Enter password" name="password" onChange={handleChange} />
                <input type="password" placeholder="confirm password" name="confirm_password" onChange={handleChange} />
                <button type="submit">Submit</button>
                <p>already have an account <Link to="/api/signin/"><span>Signin</span></Link></p>
            </form>
        </div>
    )
}

export default Signup;
