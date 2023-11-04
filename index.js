const express = require('express')
const db = require('./config/db')
const app = express()
const port = 5000
const cors = require('cors')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')


db()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => res.send('Hello World!'))

app.use("/user", userRouter)
app.use("/task", taskRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))