const express = require("express");
require("dotenv").config();
const connectDB = require("./utils/db-connect");

const authRouter = require("./routes/auth");

connectDB();

const app = express();
app.use(
	express.json({
		extended: false,
	})
);

app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
