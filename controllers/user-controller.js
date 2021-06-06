const User = require("../models/users");
const jwt = require("jsonwebtoken");

module.exports = class UserController {
  // fetch all users
  static async fetchAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // fetch user by id
  static async fetchUserById(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // create a user
  static async createUser(req, res) {
    const user = req.body;
    try {
      await User.create(user);
      res.status(201).json({ message: "User created succesfully." });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // login
  static async login(req, res) {
    try {
      const user = await User.findOne({ name: req.body.name });
      if (user && user.password === req.body.password) {
        let token = jwt.sign({ userId: user._id }, "secretkey");
        res.status(200).json({ message: "User found", token: token });
      } else {
        res.status(204).json({ message: "User not found"});
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};
