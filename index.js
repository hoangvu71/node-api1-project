const express = require('express');

const db = require("./database")

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    const allUsers = db.getUsers()

    // ERROR IN RETRIEVING USERS
    if (!allUsers) {
        res.status(500).json({
            errorMessage: "The user information couldn't be retrieve"
        })
    }
    // SUCCESS!!!!
    else {
        res.status(200).json(allUsers)
    }
})

server.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = db.getUserById(userId)

    // ERROR IN RETRIEVING USER
    if (user) {
        res.status(200).json(user)
    }
    else if (!user) {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    }
    else {
        res.status(500).json({
            errorMessage: "The user information could not be retrieved."
        })
    }
})


server.post("/users", (req, res) => {
    const newUser = {
        name: req.body.name,
        bio: req.body.bio
    }
    const createdUser = db.createUser(newUser)

    // IF NO NAME OR NO BIO
    if (!newUser.name || !newUser.bio) {
        res.status(400).json({
            errormessage: "Please provide name and bio for user"
        })
    }
    // IF SUCCESS!
    else if (createdUser) {
        res.status(201).json(newUser)
    }
    // IF ERROR FROM SERVER
    else {
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database"
        })
    }
})

server.patch("/users/:id", (req, res) => {
    const userId = req.params.id
    const updatedUser = {
        name: req.body.name,
        bio: req.body.bio
    }
    const user = db.updateUser(userId, updatedUser)

    // IF NO NAME OR BIO PROPERTY
    if (!updatedUser.name || !updatedUser.bio) {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }
    else if (!user) {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }
    else if (user) {
        res.status(201).json({
            message: "Successfully updated user.",
            user
        })
    }
    else {
        res.status(500).json({
            errorMessage: "The user information could not be modified"
        })
    }
})

server.delete('/users/:id', (req, res) => {
    const userId = req.params.id
    const userToBeDeleted = db.getUserById(userId)

    // IF CAN'T FIND THAT ID
    if (!userToBeDeleted) {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }
    const removeUser = db.deleteUser(userId)
    // IF SUCCEED (!REMOVEUSER BECAUSE NOTHING IS RETURNED FROM DB.DELETEUSER(USERID))
    if (!removeUser) {
        res.status(200).json({
            message: "User below deleted",
            userToBeDeleted
        })
    }
    // IF SERVER TROUBLE
    else {
        res.status(500).json({
            errorMessage: "The user could not be removed"
        })
    }
})
server.listen(5000, () => {
    console.log('API is running on port 5000')
})