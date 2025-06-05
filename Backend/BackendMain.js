const express = require("express");
const app = express();
const path = require("path"); //updated
const connectDB = require("./connect"); //XConnect to remote DB

app.use(express.static(path.join(__dirname, "public"))); //updated

// Middleware
app.use(express.json());

// Data model (schema)
const data = require("./tasks");

// Define a simple route
app.get("/tm/tasks", async (req,res)=> {
	try {
		const task = await data.find();
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(JSON.stringify(task));
		// res.status(200).json({task});   // Alternate method for sending response
	} catch {
		res.status(500).json({msg: error});
	};
});

//Accepts JSON, adds to DB
app.post("/tm/tasks", async (req,res)=> {
    try {
        const added = new TaskSchema(req.body);
        await added.save;
    } catch {
        res.send(err);
    };
});

//Accepts name, updates data.
app.post("/tm/tasks", async (req,res)=> {
    try {
        const updated = await data.find({name:JSON.stringify(req)});
        await updated.save();
    } catch {
        res.send(error);
    }
});

//Accepts name, deletes data
app.post("/tm/tasks", async (req,res)=> {
    try {
        const deleted = await data.deleteone({name:JSON.stringify(req)});
        console.log(deleted);
    } catch {
        res.send(error);
    }
})
const port = 8080;
const appName = "Task Manager";

// Connect to the database and start the appl server
(async function () {
	try {
		await connectDB();
		app.listen(port, () => {console.log(`${appName} is listening on port ${port}.`)});
	} catch (error) {
		console.log(error);
	};
})();