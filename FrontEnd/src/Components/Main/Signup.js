import React, { useState } from 'react'
import axios from "axios"
import { useHistory, Link } from "react-router-dom"
import Navbar from '../Navbar/Navbar'
import './style.css'

function Signup() {

    const history = useHistory();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e) {
        e.preventDefault();

        try {

            await axios.post("http://localhost:9002/signup", {
                name, email, password
            })
                .then(res => {
                    if (res.data === "exist") {
                        alert("User already exists")
                    }
                    else if (res.data === "notexist") {
                        history.push("/home", { state: { id: email } })
                        localStorage.setItem("getEmail",email);
                        localStorage.setItem("getName",name);
                    }
                })
                .catch(e => {
                    alert("wrong details")
                    console.log(e);
                })

        }
        catch (e) {
            console.log(e);

        }

    }

    return (
        <>
            <Navbar />
            <div className="cont">
                <div className="login">
                    <h1 className="text-center">Signup Form</h1>
                    <form className="needs-validation" action="post">
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Name</label>
                            <input className="form-control" type="text" onChange={(e) => { setName(e.target.value) }} id="text" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email address</label>
                            <input className="form-control" type="email" onChange={(e) => { setEmail(e.target.value) }} id="email" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input className="form-control" type="password" autoComplete='off' onChange={(e) => { setPassword(e.target.value) }} id="password" required />

                        </div>
                        <input className="btn btn-primary w-100" onClick={submit} type="submit" value="SIGN IN" />
                        <p>OR</p>
                        <Link to={'./'}><button className="btn btn-primary w-100">Login</button ></Link>
                    </form>

                </div>
            </div>

        </>
    )
}

export default Signup