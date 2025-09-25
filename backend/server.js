const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const cli = require("cli-color")
require("dotenv").config()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken") 

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 50000
const URI = process.env.URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
.then(() => {
    console.log(cli.white.bgBlue("===================="))
    console.log("Connected to MongoDB")
    console.log(cli.white.bgBlue("===================="))
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err)
})

const userSchema = mongoose.Schema({
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String
})

const userModel = mongoose.model("user", userSchema)

app.get("/", async(req, res) => {
    try {
        const data = await userModel.find()
    if (data === null) {
        return res.status(404).json({ msg: "No data found" })
    }
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({ msg: "There is an error" })
    }
   
})

app.post("/signup", async(req, res) => {
    const { fname, lname, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        const data = new userModel({fname:fname, lname:lname, email:email, password:hashedPassword})
        const sevedData = await data.save()
        res.status(201).json(sevedData)
    } catch (error) {
        res.status(500).json({ msg: "There is an error" })
    }   
})

app.post("/login", async(req, res) => { 
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(404).json({ msg: "Invalid password" })
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" })
        res.status(201).json({ token, userID: user._id, msg: "Login successful" })
        

    } catch (error) {
        res.status(500).json({ msg: "There is an error" })
    }
})    
      
app.listen(PORT, () => {
    console.log("")
    console.log(cli.white.bgBlue("=========================================="))
    console.log(`Server is running on http://localhost:${PORT}`)
    console.log(cli.white.bgBlue("=========================================="))
    console.log("")
})