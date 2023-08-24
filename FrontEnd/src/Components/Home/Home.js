import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import '../Main/style.css'
const Home = () => {
    const [val, setVal] = useState("");
    const history = useHistory();

    const getDomain = (event) => {
        setVal(event.target.value);
    }
    // console.log(location);
    const userEmail = localStorage.getItem("getEmail");
    const userName = localStorage.getItem("getName");

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
                    <div className="col-md-6 my-lg-5 my-sm-5">
                        <div className="h-100 p-5 text-white bg-dark rounded-3">
                            <h2>Welcome to PlacementArena</h2>
                            <p style={{ textAlign: "left" }}>The ultimate destination for college students who are preparing for their dream jobs. We
                                understand the importance of having a strong aptitude and technical skills to excel in your
                                career, and that's why we offer a comprehensive platform where you can test and improve your
                                skills in various areas.</p>
                        </div>
                    </div>
                    <div className="col-md-6 my-lg-5 my-5">
                        <form className="text-white bg-dark p-5 rounded-3 h-100" action="quiz-page.html" method="get">
                            {/* <div className="mb-3">
                        <label htmlFor="collegename" className="form-label">Enter College Name</label>
                        <input type="text" className="form-control" id="collegename" autocomplete="off" required/>
                    </div>  */}
                            <div className="my-2">
                                <h4>Hello, {userName}  <Link to={'./UserResult'}><button className='btn btn-secondary'>Exams History 📂</button></Link></h4>

                            </div>
                            <div className="mb-2 mt-lg-4">
                                <label htmlFor="selectedDomain" className="form-label">Select Domain</label>
                                <select className="form-select" id="selectedDomain" onChange={getDomain} name="selectedDomain" required>
                                    <option value=""> -- select an option -- </option>
                                    <option value="Python">Python</option>
                                    <option value="C">C</option>
                                    <option value="DBMS">DBMS</option>
                                    <option value="Grammar">Grammar</option>
                                    <option value="Logical-Reasoning">Logical Reasoning</option>
                                </select>
                            </div>
                            <button disabled={val === "" ? true : false} type="button" className="btn btn-secondary float-end" data-bs-toggle="modal"
                                data-bs-target="#instructions" > Proceed</button>


                            <div className="modal fade text-dark" id="instructions" data-bs-backdrop="static"
                                data-bs-keyboard="false" tabIndex="-1" aria-labelledby="instructionsLabel" aria-hidden="true" >
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="instructionsLabel">Instructions</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <ul>
                                                <li>Total number of questions: 15.</li>
                                                <li>Time allotted: 20 minutes.</li>
                                                <li>Each question carries 2 mark; there are no negative marks.</li>
                                                <li>3 Difficulty Levels (Basic, Intermediate, Advanced) - 5 Questions from each.
                                                </li>
                                                <li>DO NOT refresh the page.</li>
                                                <li>All the best!</li>
                                            </ul>
                                        </div>
                                        <div className="modal-footer">
                                            <Link to={val === "" ? "/" : `/quiz/${val}`}><button type="submit" value="submit" data-bs-dismiss="modal"
                                                className="btn btn-outline-dark">Proceed </button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-12">
                        <div className="h-100 p-5 text-white bg-dark rounded-3">
                            Our platform provides a variety of aptitude and technical tests that cover verbal, logical
                            reasoning, C, Python, DBMS, and many other topics relevant to your job placement preparation. With
                            our user-friendly interface and well-designed tests, you can easily assess your strengths and
                            weaknesses in different areas and track your progress over time.
                            <br /><br />
                            Our team of experts constantly updates the test questions and materials to ensure that they are
                            up-to-date and relevant to the current industry standards. We also provide detailed explanations and
                            solutions for each question, helping you to learn and improve from your mistakes.
                            <br /><br />
                            Whether you are preparing for your campus placements, off-campus interviews or simply want to
                            enhance your skills, <strong>PlacementArena</strong> is the perfect platform for you. Join us today
                            and take the
                            first step towards your dream career!
                        </div>

                    </div>
                </div>


            </div>
        </>

    )
}

export default Home