const express = require("express")
const users = []
const app = express()

//middleware
app.use(express.urlencoded({extended : false}));

app
    .route("/todo/:id")

    .delete((req, res) => {
        const id = Number(req.params.id);
        const userIndex = users.findIndex((user) => user.id === id );
        console.log(userIndex)
        if(userIndex !== -1){
            users.splice( userIndex, 1)
        }
        return res.json({ status : `successfully deleted user with id ${id}` })
    })

    .get((req, res) => {
        const id = Number(req.params.id)
        const user = users.find((user) => user.id === id)
        return res.json(user)
    })

    .patch((req, res) => {
        //edit todo
        const id = Number(req.params.id);
    const updates = req.body;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user by spreading the existing user and applying updates
    users[userIndex] = { ...users[userIndex], ...updates };

    return res.json({ status: `Successfully edited the todo with id ${id}` })
    });
    
app.post("/todo/add",(req, res) => {
        const body = req.body;
        users.push({...body, id: users.length+1})
        return res.json({ id : users.length, status : "success" })
})

app.get("/todo", (req, res) => {
    const todo = `
    <ol>
       ${users.map((value) =>`<li> 
        <b>${value.task}</b>
        is done ${value.isDone}.</li>`).join("")}
    </ol>
    `
    res.send(todo)
})

const port = 3000
app.listen(port, ()=> {
    console.log(`Server is live at ${port}`)
})