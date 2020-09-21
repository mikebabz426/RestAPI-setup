const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
	{ id: 1, name: "course one" },
	{ id: 2, name: "course two" },
	{ id: 3, name: "course three" },
];

//Set Up Home Page

app.get("/", (req, res) => {
	res.send("<section><h1>Welcome to the Home Page!</h1></section>");
});

//Request All Courses

app.get("/api/courses", (req, res) => {
	res.send(courses);
});

//Request Single Course

app.get("/api/courses/:id", (req, res) => {
	const course = courses.find((c) => c.id === parseInt(req.params.id));
	if (!course) res.status(404).send("This course does not exist");
	res.send(course);
});

//Add a New Course

app.post("/api/courses", (req, res) => {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	//Validates that the new course matches all requirements before adding to database

	const { error, value } = schema.validate(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
	} else {
		const course = {
			id: courses.length + 1,
			name: value.name,
		};
		courses.push(course);
		res.send(course);
	}
});

//Updating a Course

app.put("/api/courses/:id", (req, res) => {});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
