async function loadPhotos() {
  var photos = localStorage.getItem("photos");
  // load data from the json file for first time.
  if (photos == null) {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    var photos = await response.json();
    photos = JSON.stringify(photos);
    localStorage.setItem("photos", photos);
  }
  return JSON.parse(photos);
}

export async function getPhoto(userId) {
  var photos = await loadPhotos();
  for (var i = 0; i < photos.length; i++) {
    var photo = photos[i];
    if (photo.id == userId) {
      return photo.url;
    }
  }
  return "https://via.placeholder.com/600/92c952";
}

async function loadPosts() {
  var posts = localStorage.getItem("posts");
  if (posts == null) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    var posts = await response.json();
    posts = JSON.stringify(posts);
    localStorage.setItem("posts", posts);
  }
  return JSON.parse(posts);
}

export async function loadPostsByUser(userId) {
  var posts = await loadPosts();
  var filter_posts = [];

  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];
    if (post.userId == userId) {
      filter_posts[filter_posts.length] = post;
    }
  }
  return filter_posts;
}

export function logOut() {
  localStorage.setItem("loginState", "logout");
}

export function searchPost(keyword) {
  var posts = JSON.parse(localStorage.getItem("current_posts"));
  localStorage.setItem("postState", "filter");
  var filter_posts = [];
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];
    if (post.body.search(keyword) != -1 || post.title.search(keyword) != -1) {
      filter_posts[filter_posts.length] = post;
    }
  }
  localStorage.setItem("current_posts", JSON.stringify(filter_posts));
}

export async function followUser(username, friendList) {
  var users = JSON.parse(localStorage.getItem("users"));
  var photos = JSON.parse(localStorage.getItem("photos"));
  localStorage.setItem("postState", "larger");

  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (user.username == username) {
      var url = "";
      for (var i = 0; i < photos.length; i++) {
        var photo = photos[i];
        url = photo.url;
        break;
      }
      const f = {
        path: url,
        name: user.username,
        status: user.website,
        id: user.id,
      };
      var updatedFriends = [f, ...friendList];
      var add_posts = await loadPostsByUser(user.id);
      var existing_posts = JSON.parse(localStorage.getItem("current_posts"));
      existing_posts = [...add_posts, ...existing_posts];
      localStorage.setItem("current_posts", JSON.stringify(existing_posts));
      return updatedFriends;
    }
  }
  alert("No such users")
  return friendList
}


export async function initializeFriendList(userId, friendList) {
  var users = JSON.parse(localStorage.getItem("users"));
  var photos = JSON.parse(localStorage.getItem("photos"));

  console.log(userId)
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    if (user.id == userId) {
      var url = "";
      for (var i = 0; i < photos.length; i++) {
        var photo = photos[i];
        url = photo.url;
        break;
      }
      const f = {
        path: url,
        name: user.username,
        status: user.website,
        id: user.id,
      };
      var updatedFriends = [f, ...friendList];  
      return updatedFriends;
    }
  }
  alert("No such users")
  return friendList
}

export function unfolloUser(id, friends) {
  for (let i = 0; i < friends.length; i++) {
    if (friends[i].id === id) {
      friends.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("postState", "smaller");
  var posts = JSON.parse(localStorage.getItem("current_posts"));
  var new_posts = [];
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];
    if (post.userId != id) {
      new_posts[new_posts.length] = post;
    }
  }
  localStorage.setItem("current_posts", JSON.stringify(new_posts));
  return friends;
}

export default { getPhoto, loadPostsByUser, logOut, searchPost,initializeFriendList };
