import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function Premium() {
    const { id } = useParams();
    const [userDetail, setuserDetail] = useState(
        {
            name:"",
            email:"",
            description:""
        }
    )
    const handleChange = (e)=>{
        setuserDetail({...userDetail, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await API.post(`user/premium/${id}`, userDetail,
                {
            headers: {
                'Content-Type': 'application/json',
        }
        })
    }
    catch {

    }
}

    return
        <>
            <div className="container">
                <h1> Premium Interest Users </h1>
                <form action="" method='POST' onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Enter your name" onChange={handleChange} />
                    <input type="text" name="email" placeholder="Enter your email" onChange={handleChange} />
                    <input type="text" name="description" placeholder="Describe your expectation" onChange={handleChange} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
}

