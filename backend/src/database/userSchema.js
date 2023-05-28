const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: [true, "ID is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  salt: {
    type: String,
    required: [true, "Salt is required"],
  },
  hashedPassword: {
    type: String,
    required: [true, "hashedPassword is required"],
  },
});

const User = mongoose.model("user", userSchema);

async function createUser(user) {
  return new User(user).save();
}

async function findUser(username) {
  return await User.findOne({ username });
}

async function findAllUsers() {
  return await User.find();
}

async function updateUser(conditions,updates) {
    return await User.findOneAndUpdate(conditions,updates);
}

module.exports = {
  createUser,
  findUser,
  findAllUsers,
  updateUser,
};
