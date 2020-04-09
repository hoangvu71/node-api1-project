let users = [
    {
        id: "1",
        name: "Dan",
        bio: "Dan the man!"
    },
    {
        id: "2",
        name: "Don",
        bio: "Don the mon"
    }
]

function getUsers() {
   return users
}

function getUserById(id) {
    return users.find(ele => ele.id === id)
}


function createUser(data) {
   const payload = {
       id: String(users.length + 1),
       ...data
   }
   users.push(payload)
   return payload
}

function updateUser(id, data) {
    const userToFind = users.find(ele => ele.id === id)
    const findIndex = users.findIndex(user => user == userToFind)
    users[findIndex] = data
    return users[findIndex]
}

function deleteUser(id) {
    users = users.filter(u => u.id != id)
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}