const express = require("express")

const app = express()

const connectDB = require("./config/connectDB")



// 3- Setup the Env variables (for confidential Data)
require("dotenv").config({ path : "./config/.env" })
// console.log(process.env.MONGO_URL)


 
// 2- connect The Date Base :
connectDB()

// convert the Data To JSON Format ( OR BODY PARSER)
app.use(express.json())

// 4- Create you Schema : 
const User = require("./models/user")


/************START CRUD OPERATIONS**********************/


// GET ALL USERS
// PATH : /api/users
// using the mongoose methode find()

app.get("api/users" , (req , res) => {
  User.find()
      .then((users) => res.send({ msg : "GET USERS" }))
      .catch((err) =>res.send({ msg : "Error" , err  }))
})

// GET USER BY ID
// PATH : /api/users/userID
// using the mongoose methode findById()

app.get("/api/users/:userID" , (req , res) => {
    const id = req.params.userID
    User.findById(id)
    .then((user) => {
      if(!user) {
        return res.status(404).send({ msg : "User Not Found" })
      }
      res.send({ msg : "Get User By ID" ,  user})
    })
    .catch((err) => res.status(400).send({ msg : "Error" , err }))
  })
  
// ADD USER
// PATH : /api/add_user
// using the mongoose methode save() 

app.post("api/add_user" , (req , res) => {
    const { name , lastName , Email , phone } = req.body
    const  newUser = new User({ name , lastName , Email , phone })
    newUser.save()
    .then(user => res.send({ msg : "User Added with Success" , user}))
    .catch((err) => res.send({ msg : "Error" , err }))
})



// UPDATE USER BY ID
// PATH : /api/users/:userID
// using the mongoose methode findByIdAndUpdate()

app.put("/api/users/:userID" , (req , res) => {
    const userID = req.params.userID
    User.findByIdAndUpdate(userID , req.body , { new : true }) 
    .then((user) =>{ 
      if(!user) {
        return res.status(404).send({ msg : "User Not Found" })
      }
      res.send({ msg : "Updated" , user })}
    )
    .catch((err) => res.status(400).send({ msg : "Error" , err}))
    })
    




// DELETE USER BY ID
// PATH : /api/users/:userID
// using the mongoose methode findOneAndDelete()

app.delete("/api/users/userID" , (req , res) => {
    const id = req.params.userID
    User.findByIdAndDelete(id)   // findOneAndDelete({ _id : value of the id })
        .then((user) => {  
          if(!user) {
            return res.status(404).send({ msg : "User Not Found" })
          }
          res.send({ msg : "User Removed" , user })  }  ) 
        .catch((err) => res.status(400).send({ msg : "Error" , err }))  
  })

  
  
/*****************END CRUD OPERATIONS*************************/  











// 1- starting the Server :
const PORT = 5000 

app.listen(PORT , () => {
    console.log(`The Server Start Running On Port : http//localhost:${PORT}`)
})