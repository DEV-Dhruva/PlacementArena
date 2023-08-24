import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../Admin/admin.css'
import Navbar from '../Navbar/Navbar'

function UserResult() {

  const [data, setData] = useState([])
  const history = useHistory();

  const userName = localStorage.getItem("getName");

  useEffect(() => {
    fetch("http://localhost:9002/getUserMarks", {
      method: "GET"
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data.data);
        setData(data.data);
      })
  }, [])

  const userEmail = localStorage.getItem("getEmail");

  useEffect(() => {
    if (!userEmail) {
      history.push('/')
    }
  }, [userEmail, history])




  return (
    <>
      <Navbar />
      <div className="container-fluid m-md-auto">
        <div className="row m-lg-5 gx-5">
          <div className="col-md-12 my-sm-3">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>Welcome to PlacementArena , {userName}. <Link to={'./Home'}><button className='btn btn-secondary'>Back to Home 👈</button></Link></h2>
            </div>
          </div>
          <div className="col-md-12 my-3">
            <div className="h-100 p-5 text-white bg-dark rounded-3 d-flex flex-column justify-content-center">
              <h2>User Results : </h2>
              <table>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Domain</th>
                  <th>Score</th>
                  <th>Correct</th>
                </tr>
                {data.map((i) => {
                  if (i.name === userName) {
                    return (
                      <tr>
                        <td>{i.name}</td>
                        <td>{i.email}</td>
                        <td>{i.domain}</td>
                        <td>{i.score} / 30</td>
                        <td>{i.correct} out of 15</td>
                      </tr>
                    )
                  }
                  else {
                    return null
                  }
                })}
              </table>
            </div>
          </div>
        </div>
      </div >
    </>

  )
}

export default UserResult