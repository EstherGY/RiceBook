async function loadUsers() {
  var users = localStorage.getItem("users");
  // load data from the json file for first time.
  if (users == null) {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    var users = await response.json()
    users = JSON.stringify(users)
    var max_id = users.length -1
    localStorage.setItem("users", users)
    localStorage.setItem("max_id", max_id)
  }
  return JSON.parse(users);
}

function updateUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

export async function isUserExisting(username) {
  var users = await loadUsers();
  var len = await users.length;
  for (var i = 0; i < len; i++) {
    var user = users[i];
    if (user.name === username) {
      return true;
    }
  }
  return false;
}

export async function login(username, ps) {
  var users = await loadUsers();
  var len = await users.length;
  for (var i = 0; i < len; i++) {
    var user = users[i]
    if (user.username === username && user.address.street === ps) {
      localStorage.setItem('accountName', username)
      localStorage.setItem('currentUser', JSON.stringify(user))
      localStorage.setItem('currentUserId', JSON.stringify(user.id))
      localStorage.setItem('loginState', "login")
      return true;
    }
  }
  localStorage.setItem('accountName', username)
  localStorage.setItem('loginState', "error")
  return false;
}

export async function addUser(user) {
  var users = await loadUsers();
  var len = await users.length;
  if (await isUserExisting(user.name)) {
    return false;
  }
  users[len] = user;
  updateUsers(users);
  return true;
}

export default { addUser, isUserExisting, login };
