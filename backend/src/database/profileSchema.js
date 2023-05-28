const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  dob: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  email: {
    type: String,
  },
  avatar: {
    type: String,
  },
  headline: {
    type: String,
  },
});

const Profile = mongoose.model("profile", profileSchema);

async function createProfile(profile) {
  return new Profile(profile).save();
}

async function findProfile(username) {
  return await Profile.findOne({ username });
}

async function updateProfile(conditions, updates) {
  return await Profile.findOneAndUpdate(conditions, updates);
}

module.exports = {
  createProfile,
  findProfile,
  updateProfile,
};
