const mongoose = require("mongoose");

const connectionString = "mongodb+srv://Team9:1234@cluster0.pdc2xzl.mongodb.net/TM-Tx?retryWrites=true&w=majority";

const connectDB = () => {
	return mongoose.connect(connectionString);
};

module.exports = connectDB;