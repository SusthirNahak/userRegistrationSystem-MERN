const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyparser.json());

// Connect to MongoDB

mongoose.connect("mongodb://localhost:27017/userdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// User schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  age: { type: Number, required: true, min: 0, max: 120 },
  dob: { type: Date, required: true },
  password: { type: String, required: true, minlength: 10 },
  gender: { type: String, required: true },
  about: { type: String, maxlength: 5000 },
});

const User = mongoose.model("User", userSchema);

// gender options
app.get("/api/genders", (req, res) => {
  res.json(["Male", "Female", "Other"]);
});

// CREATE
app.post("/api/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save(); 
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ


app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update 


app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, 
    });
    if (!updatedUser) return res.status(404).json({ message: "User not found!!!" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found!!!" });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const port = 8080;

app.listen(port, () => {
  console.log(`My server is running on: http://localhost:${port}`);
});
