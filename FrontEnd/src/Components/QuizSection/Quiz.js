import React, { useEffect, useState } from 'react'
import axios from "axios"
import CountdownTimer from './CountdownTimer'
import { useParams, useHistory } from 'react-router-dom';
import './quiz.css'
import defaultfile from '../../Data/default.json'


const Quiz = () => {
    const history = useHistory();
    const params = useParams();
    const dom = params.tech;
    const [question, setQuestion] = useState(defaultfile.level);
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [showQuizCard, setShowQuizCard] = useState(true);

    const userEmail = localStorage.getItem("getEmail");


    useEffect(() => {
        if (!userEmail) {
            history.push('/')
        }
    }, [userEmail, history])



    useEffect(() => {
        function pullJson() {
            fetch(`https://dev-dhruva.github.io/jsonData/${dom}.json`).then((response) => {
                return response.json();
            }).then((data) => {
                // console.log(data.level);
                setQuestion(data.level)
            }).catch((err) => {
                console.log(err);
            })
        }

        pullJson();
    }, [dom])

    let newAnswers;

    const toggleDivs = () => {
        setShowQuizCard(!showQuizCard);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        // console.log(event.target.value);
        newAnswers = { ...answers };
        // console.log(newAnswers);
        newAnswers[index] = event.target.value;
        setAnswers(newAnswers);
    };

    const handleTimeUp = () => {
        // Do something when the timer reaches zero
        submitquiz();
    };




    const nextQues = () => {
        if (index >= (question.length - 1)) {
            setIndex(question.length - 1)
        }
        else {
            setIndex(index + 1)
            setSelectedOption(null);
            newAnswers = { ...answers };
            newAnswers[index + 1] = null;
            setAnswers(newAnswers);
            // console.log(answers);
        }
    }



    const submitquiz = () => {
        console.log("submitted")
        let newScore = 0, newCorrect = 0;
        Object.values(answers).forEach((value, index) => {
            if (question[index].ans === value) {
                newScore = newScore + 2;
                newCorrect++;
            }
        });
        setScore(newScore);
        setCorrect(newCorrect);
        toggleDivs();
    }

    const getemail = localStorage.getItem("getEmail");
    const userName = localStorage.getItem("getName");
    const domain = dom;

    async function storeResult(e) {
        try {

            await axios.post("http://localhost:9002/result", {
                userName, getemail, domain, score, correct
            })
                .then(res => {
                    if (res.data === "exist") {
                        alert("Your marks have been successfully stored, thank you.");
                        history.push("/home", { state: { id: getemail } })

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
        <div>
            <div className="container my-5">

                <div className="row d-flex justify-content-center mx-1">

                    {!showQuizCard ? <div id="result" className="result text-center my-0 col-md-8" style={{ display: 'block' }}>
                        <h3 className="my-3 display-4">Marks: <span id="marks">{score}</span>/30</h3>
                        <h3 className="my-3"><span id="correct-answer">{correct}</span> Correct out of 15.</h3>
                        <div className="d-flex justify-content-center m-5">
                            <a href="/Home"><button onClick={storeResult} className="btn btn-primary btn-lg mx-auto">Back to Main Page</button></a>
                        </div>
                    </div> : null}
                    {showQuizCard ? <div className="col border p-4 quiz-card" style={{ display: 'block' }}>
                        <div className="row card-body">
                            <div className="col-md-4">
                                <h5 className="card-text text-center fw-bold mb-3">Question : (<span id="quesNum"> {index + 1}</span> of {question.length}  <span
                                    id="totalQuesNum"></span>)
                                </h5>
                            </div>
                            <div className="col-md-4">
                                <h5 className="card-text text-center fw-bold mb-3">Time :<CountdownTimer duration={1200} onTimeUp={handleTimeUp} />
                                </h5>
                            </div>
                            <div className="col-md-4">
                                <h5 className="card-text text-center fw-bold domain">{dom}-Quiz</h5>
                            </div>
                        </div>
                        <hr />

                        <div id="main">
                            <div className="card-body">
                                <h5 className="card-text fw-bold text-center" id="question">{question[index].question}</h5>
                            </div>
                            <div id="options" className="ms-3">
                                <div className="col-md-12 text-start">
                                    <input type="radio" name="answer" className="answer" value="ans1" checked={selectedOption === 'ans1'} onChange={handleOptionChange} id="ans1" />
                                    <label htmlFor="ans1" id="option1">{question[index].a}</label>
                                </div>

                                <div className="col-md-12 text-start">
                                    <input type="radio" name="answer" className="answer" value="ans2" checked={selectedOption === 'ans2'} onChange={handleOptionChange} id="ans2" />
                                    <label htmlFor="ans2" id="option2">{question[index].b}</label>
                                </div>

                                <div className="col-md-12 text-start">
                                    <input type="radio" name="answer" className="answer" value="ans3" checked={selectedOption === 'ans3'} onChange={handleOptionChange} id="ans3" />
                                    <label htmlFor="ans3" id="option3">{question[index].c}</label>
                                </div>

                                <div className="col-md-12 text-start">
                                    <input type="radio" name="answer" className="answer" value="ans4" checked={selectedOption === 'ans4'} onChange={handleOptionChange} id="ans4" />
                                    <label htmlFor="ans4" id="option4">{question[index].d}</label>
                                </div>
                            </div>
                            <div className="footer m-3">
                                <button className="btn btn-primary float-start submit" id="submit" onClick={submitquiz}>submit</button>
                                {/* <button className="btn btn-success float-start" id="prev" onClick={prevQues}>Previous</button> */}
                                {index < 14 ? <button className="btn btn-success float-end" id="next" onClick={nextQues}>Next</button> : <button className="btn btn-success float-end disabled" id="next" onClick={nextQues}>Next</button>}
                            </div>
                        </div>


                    </div> : null}
                </div>
            </div>
        </div >
    )
}

export default Quiz