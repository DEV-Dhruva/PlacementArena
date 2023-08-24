import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/placementarena', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
console.log("DB connected")


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const resultSchema = new mongoose.Schema({
    name: String,
    email: String,
    domain: String,
    score: String,
    correct: String
})



const User = new mongoose.model("User", userSchema)

const Result = new mongoose.model("Result", resultSchema)

//Routes
app.get("/", cors(), (req, res) => {

})


app.post("/", async (req, res) => {
    const { email, password } = req.body

    try {
        if (email === 'admin@gmail.com' && password === 'Admin@123') {
            res.json("adminExist")
        }
        else {
            const check = await User.findOne({ email: email, password: password })
            if (check) {
                res.json(check.name)
            }
            else {
                res.json("notexist")
            }
        }

    }
    catch (e) {
        res.json("fail")
    }

})



app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body

    const data = {
        name: name,
        email: email,
        password: password
    }

    try {
        const check = await User.findOne({ email: email })

        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
            await User.insertMany([data])
        }

    }
    catch (e) {
        res.json("fail")
    }

})

app.post("/result", async (req, res) => {
    const { userName, getemail, domain, score, correct } = req.body

    const data = {
        name: userName,
        email: getemail,
        domain: domain,
        score: score,
        correct: correct
    }

    try {
        const check = await User.findOne({ email: getemail })

        if (check) {
            res.json("exist")
            await Result.insertMany([data])
        }

    }
    catch (e) {
        res.json("fail")
    }

})

app.get("/getUserMarks", async (req, res) => {
    try {
        const allUser = await Result.find({});
        res.send({ status: "ok", data: allUser });

    } catch (error) {
        console.log(error);
    }
})


app.listen(9002, () => {
    console.log("BE started at port 9002")
})