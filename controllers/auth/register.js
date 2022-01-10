const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./../../models/user");

const registerUser = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				error: "User already exists",
			});
		}

		const hashedPassword = bcrypt.hashSync(password, 12);
		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		console.log(user);

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		res.status(201).json({ token });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: "Something went wrong!" });
	}
};

module.exports = registerUser;
