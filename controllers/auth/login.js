const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./../../models/user");

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res.status(400).json({
				error: "User does not exist",
			});
		}

		const valid = bcrypt.compareSync(password, existingUser.password);
		if (!valid) {
			return res.status(400).json({
				error: "Invalid password",
			});
		}

		console.log(existingUser);

		const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		res.status(200).json({ token });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: "Something went wrong!" });
	}
};

module.exports = loginUser;
