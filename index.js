const express = require("express")
const uuid = require("uuid")

const app = express()
app.use(express.json())

const info = []

const checkUserId = (request, response, next) => {
    const { id } = request.params
    
    request.userId = id

    next()
}

app.use(checkUserId)


app.get("/users", (request, response) => {
    return response.json(info)
})

app.post("/users", (request, response) => {
    const { order, clientName, price, status } = request.body

    const user = { id: uuid.v4(), order, clientName, price, status }

    info.push(user)


    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const  id  = request.userId
    const {  order, clientName, price, status } = request.body

    const index = info.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    const updatedInfo = { id, order, clientName, price, status }

    info[index] = updatedInfo

    return response.json(updatedInfo)
})

app.delete("/users/:id", checkUserId, (request, response) => {
    const id  = request.userId

    const index = info.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    info.splice(index, 1)

    return response.status(204).json()
})


app.patch("/users/:id", checkUserId,  (request, response) => {
    const id  = request.userId

    const {  order, clientName, price, status } = request.body

    const index = info.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    const updatedInfo = { id, order, clientName, price, status }

    info[index] = updatedInfo

    return response.json(updatedInfo)
})

app.listen(3000, () => {
    console.log("server started on port 3000😁")
})