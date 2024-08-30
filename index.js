const express = require("express")
const fs = require("fs")

const app = express()

app.get("/todo", (req, res) => {
    res.send(`hello world!`)
})

const port = 3000
app.listen(port, ()=> {
    console.log(`Server is live at ${port}`)
})