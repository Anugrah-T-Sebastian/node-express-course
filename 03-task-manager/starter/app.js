const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config(); //TO KEEP USERNAME AND PASSOWRD SECRET!
const notFound = require("./middleware/not-found");

// MIDDLEWARE
app.use(express.static("./public"));
app.use(express.json());

// ROUTES
app.get("/hello", (req, res) => {
  res.send("Task manager app");
});

app.use("/api/v1/tasks", tasks);

app.use(notFound);

//app.get('/api/v1/tasks')          - get all the tasks
//app.post('/api/v1/tasks')         - create a new task
//app.get('/api/v1/tasks/:id')      - get single task
//app.patch('/api/v1/tasks/:id')    - update task
//app.delete('/api/v1/tasks/:id')   - delete task

const port = process.env.PORT || 3000; // To set port according to availability of the server

const start = async () => {
  try {
    // connectDB returns a promise
    await connectDB(process.env.MONGO_URI); //TO KEEP USERNAME AND PASSOWRD SECRET!
    // IMPORTANT: ONLY START THE SERVER AFTER CONNECTION WITH DB IS ESTABLISHED
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
