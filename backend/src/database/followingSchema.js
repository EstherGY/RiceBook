const mongoose = require("mongoose");

const followingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  following: {
    type: [String],
    required: [true, "following is required"],
    default:[]
  },
});

const Following = mongoose.model("following", followingSchema);

async function createFollowing(following) {
  return new Following(following).save();
}

async function findFollowing(username) {
  return await Following.findOne({ username });
}

async function updateFollowing(conditions, updates) {
  return await Following.findOneAndUpdate(conditions, updates,{returnDocument:"after"});
}

module.exports = {
  createFollowing,
  findFollowing,
  updateFollowing,
};
