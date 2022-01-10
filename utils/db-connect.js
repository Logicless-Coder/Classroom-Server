const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

const connect = () => {
	mongoose.connect(
		DB_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		(err) => {
			if (err) console.log(err);
			else console.log("Connected to DB");
		}
	);
};

module.exports = connect;
