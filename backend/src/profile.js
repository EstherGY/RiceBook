const { sessionUser, cookieKey, connectionString } = require("./server");
const mongoose = require("mongoose");
const {
  findUser,
  updateUser,
} = require("./database/userSchema");

const {
  createProfile,
  updateProfile,
  findProfile
} = require("./database/profileSchema")

const {
  createFollowing,
  findFollowing,
  updateFollowing,
} = require("./database/followingSchema");

function getProfile(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let username = req.query.username;
  (async () => {
    const connector = mongoose.connect(connectionString);
    let user = await connector.then(async () => {
      return findProfile(username);
    });
    res.send(user);
  })();
}

function getProfileFields(req, res, field) {
  let username = req.params.user;
  (async () => {
    const connector = mongoose.connect(connectionString);
    let user = await connector.then(async () => {
      return findProfile(username);
    });
    let msg = {
      username: username,
    };
    if (!user) {
      msg[field] = "";
    } else {
      msg[field] = user[field];
    }
    res.send(msg);
  })();
}

function updateProfileFields(req, res, field, value) {
  let username = req.username;
  (async () => {
    const connector = mongoose.connect(connectionString);
    updates = {};
    updates[field] = value;
    let user = await connector.then(async () => {
      return updateProfile({ username: username }, updates);
    });
    let msg = {
      username: username,
    };
    if (!user) {
      msg[field] = "";
    } else {
      msg[field] = value;
    }
    res.send(msg);
  })();
}

function getHeadline(req, res) {
  getProfileFields(req, res, "headline");
}

function updateHeadline(req, res) {
  updateProfileFields(req, res, "headline", req.body.headline);
}

function getEmail(req, res) {
  getProfileFields(req, res, "email");
}

function updateEmail(req, res) {
  updateProfileFields(req, res, "email", req.body.email);
}

function getDob(req, res) {
  getProfileFields(req, res, "dob");
}

function getZipcode(req, res) {
  getProfileFields(req, res, "zipcode");
}

function updateZipcode(req, res) {
  updateProfileFields(req, res, "zipcode", req.body.zipcode);
}

function getAvatar(req, res) {
  getProfileFields(req, res, "avatar");
}

function updateAvatar(req, res) {
  console.log(req.body)
  updateProfileFields(req, res, "avatar", req.body.avatar);
}

function getFollowing(req, res) {
  let username = req.params.user;
  (async () => {
    const connector = mongoose.connect(connectionString);
    let followings = await connector.then(async () => {
      return findFollowing(username);
    });
    res.send({ username: username, following: followings });
  })();
}

function updateFollowingHandler(req, res) {
  let username = req.username;
  let new_following = req.params.user;
  (async () => {
    const connector = mongoose.connect(connectionString);
    let followings = await connector.then(async () => {
      return findFollowing(username);
    });
    if(followings===null){
      followings = await connector.then(async () => {
        return createFollowing({username:username,following:[]});
      });
    }
    followings.following.push(new_following);
    let updatedFollowings = await connector.then(async () => {
      return updateFollowing({ username }, { following: followings.following });
    });
    res.send({ username: username, following: updatedFollowings });
  })();
}

function deleteFollowing(req, res) {
  let username = req.username;
  let remove_following = req.params.user;
  (async () => {
    const connector = mongoose.connect(connectionString);
    let followings = await connector.then(async () => {
      return findFollowing(username);
    });
    followings.following.remove(remove_following);
    let updatedFollowings = await connector.then(async () => {
      return updateFollowing({ username }, { following: followings.following });
    });
    res.send({ username: username, following: updatedFollowings });
  })();
}

module.exports = (app) => {
  app.get("/profileInfo", getProfile);
  app.get("/headline/:user?", getHeadline);
  app.put("/headline", updateHeadline);
  app.get("/email/:user?", getEmail);
  app.put("/email", updateEmail);
  app.get("/dob/:user?", getDob);
  app.get("/zipcode/:user?", getZipcode);
  app.put("/zipcode", updateZipcode);
  app.get("/avatar/:user?", getAvatar);
  app.put("/avatar", updateAvatar);
  app.get("/following/:user?", getFollowing);
  app.put("/following/:user", updateFollowingHandler);
  app.delete("/following/:user", deleteFollowing);
};
