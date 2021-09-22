const express = require('express')
const app = express()
const port = 8080
const todoRoute = require("./routes/todo")
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use("/todo",todoRoute)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
