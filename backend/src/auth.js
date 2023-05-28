const md5 = require("md5");
const mongoose = require("mongoose");
const {
  createUser,
  findUser,
  findAllUsers,
  updateUser,
} = require("./database/userSchema");

const {
  createProfile,
  updateProfile,
  findProfile
} = require("./database/profileSchema")


const { sessionUser, cookieKey, connectionString } = require("./server");

function isLoggedIn(req, res, next) {
  // likely didn't install cookie parser
  if (!req.cookies) {
    return res.sendStatus(401);
  }

  let sid = req.cookies[cookieKey];

  // no sid for cookie key
  if (!sid) {
    return res.sendStatus(401);
  }

  let username = sessionUser[sid];

  if (sid === "tc") { // test account, pass login check
    username = "tc";
    sessionUser["tc"] = "tc"
  }

  // no username mapped to sid
  if (username) {
    req.username = username;
    next();
  } else {
    return res.sendStatus(401);
  }
  console.log("Successfully Log with Cookies")

}

function setCookieAndSession(res, username) {
  // create session id, use sessionUser to map sid to user username
  let sid = username; // CHANGE THIS!
  sessionUser[sid] = username;

  // Adding cookie for session id
  res.cookie(cookieKey, sid, {
    maxAge: 3600 * 1000,
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  return res;
}

function login(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control","no-cache");
  let username = req.body.username;
  let password = req.body.password;
  console.log("Login Requested"+username+password)

  // supply username and password
  if (!username || !password) {
    return res.sendStatus(400);
  }

  (async () => {
    const connector = mongoose.connect(connectionString);

    let user = await connector.then(async () => {
      return findUser(username);
    });
    if (!user) {
      return res.sendStatus(401);
    }
    console.log(user);
    // create hash using md5, user salt and request password, check if hash matches user hash
    let hash = md5(user.salt + password);
    // res = setCookieAndSession(res, username);
    // let msg = { username: username, result: "success" };
    // res.send(msg);
    if (hash === user.hashedPassword) {
      // Adding cookie for session id
      res = setCookieAndSession(res, username);
      let msg = { username: username, result: "success" };
      res.send(msg);
    } else {
      res.sendStatus(401);
    }
  })();
}

function register(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let dob = req.body.dob;
  let zipcode = req.body.zipcode;

  // supply username and password
  if (!username || !password) {
    return res.sendStatus(400);
  }

  // combination of the user's username and the current time
  let salt = username + new Date().getTime();
  // hash of the user's salted password.
  let hash = md5(salt + password);

  (async () => {
    const connector = mongoose.connect(connectionString);

    let users = await connector.then(async () => {
      return findAllUsers();
    });
    console.log("Current Users Total:" + users.length);

    let user = null;
    for (var i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        user = users[i];
        break;
      }
    }

    console.log("Find User " + user);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control","no-cache");
    let msg;
    if (!user) {
      // User: username, salt, salted password hash
      new_user = {
        userId: users.length + 1,
        username: username,
        salt: salt,
        hashedPassword: hash
      };

      new_profile = {
        username: username,
        email: email,
        dob: dob,
        zipcode: zipcode,
        avatar: "https://via.placeholder.com/600/197d29",
      };

      created_user = await createUser(new_user);
      created_profile = await createProfile(new_profile);
      msg = { username: username, result: "success" };
      res = setCookieAndSession(res, username);
      res.send(msg);
    } else {
      msg = { username: username, result: "User Already Exists" };
      res.send(msg);
    }
    return res.status(200).json({
      code:0,
      msg: msg
    })
  })();
}

function logout(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control","no-cache");
  let sid = req.cookies[cookieKey];
  let username = sessionUser[sid];
  // remove their sessionKey from the sessionUser map
  delete sessionUser[sid];
  // clear/delete the cookie in the response object.
  res.clearCookie(cookieKey);
  res.sendStatus(200);
}

function password(req, res) {
  let sid = req.cookies[cookieKey];
  let password = req.body.password;

  // no sid for cookie key
  if (!sid) {
    return res.sendStatus(401);
  }
  let username = sessionUser[sid];
  (async () => {
    const connector = mongoose.connect(connectionString);

    // update both salt and password
    let salt = username + new Date().getTime();
    // hash of the user's salted password.
    let hash = md5(salt + password);
    let user = await connector.then(async () => {
      return updateUser(
        { username: username },
        { salt: salt, hashedPassword: hash }
      );
    });
    if (!user) {
      let msg = { username: username, result: "Fail To Update" };
      res.send(msg);
    } else {
      let msg = { username: username, result: "success" };
      res.send(msg);
    }
  })();
}

module.exports = (app) => {
  app.post("/login", login);
  app.post("/register", register);
  //app.use(isLoggedIn);
  app.put("/logout", logout);
  app.put("/password", password);
};
