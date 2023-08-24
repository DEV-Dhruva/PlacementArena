import React, { useState } from 'react'
import axios from "axios"
import { useHistory, Link } from "react-router-dom"
import './style.css'
import Navbar from '../Navbar/Navbar'

function Login() {

    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e) {
        e.preventDefault();

        try {

            await axios.post("http://localhost:9002/", {
                email, password
            })
                .then(res => {
                    // console.log(res);
                    if (res.data === "notexist") {
                        alert("Invalid Email or Password")
                    }
                    else if (res.data === "adminExist") {
                        history.push("/admin", { state: { id: email } })
                        localStorage.setItem("getEmail", email);
                    }
                    else {
                        history.push("/home", { state: { id: email } })
                        localStorage.setItem("getEmail", email);
                        localStorage.setItem("getName", res.data);
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
                    <h1 className="text-center">Login Form</h1>
                    <form className="needs-validation">
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email address</label>
                            <input className="form-control" type="email" onChange={(e) => { setEmail(e.target.value) }} id="email" required />

                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input className="form-control" type="password" autoComplete='off' onChange={(e) => { setPassword(e.target.value) }} id="password" required />
                        </div>
                        <input className="btn btn-primary w-100" type="submit" onClick={submit} value="SIGN IN" />
                        <p>OR</p>
                        <Link to={'./Signup'}><button className="btn btn-primary w-100">Signup</button ></Link>
                    </form>

                </div>
            </div >

        </>
    )
}

export default Login