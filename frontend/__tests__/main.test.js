import { followUser, getPhoto, loadPostsByUser, logOut, searchPost, unfolloUser } from "../src/MainView/mainServer";
global.fetch = require("node-fetch");

test("load_photo_of_non_Existing", async () => {
  var result = await getPhoto(10000000);
  expect(result).toBe("https://via.placeholder.com/600/92c952");
});

test("load_photo_of_Existing", async () => {
    var result = await getPhoto(2);
    expect(result).toBe("https://via.placeholder.com/600/771796");
  });
  
test("load_posts_of_users",async()=>{
    var result = await loadPostsByUser(1);
    expect(result.length).toBe(10);
})

test("load_filter_posts",async()=>{
    var posts = await loadPostsByUser(1);
    localStorage.setItem("current_posts",JSON.stringify(posts))

    searchPost("est")
    var result = localStorage.getItem("current_posts")
    result = JSON.parse(result)

    expect(result.length).toBe(9);
    expect(localStorage.getItem("postState")).toBe("filter");

})


test("load_larger_posts",async()=>{

    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    var users = await response.json()
    users = JSON.stringify(users)
    localStorage.setItem("users", users)


    const photos_response = await fetch("https://jsonplaceholder.typicode.com/photos")
    var photos = await photos_response.json()
    photos = JSON.stringify(photos)
    localStorage.setItem("photos", photos)


    var posts = await loadPostsByUser(1);
    localStorage.setItem("current_posts",JSON.stringify(posts))

    followUser("Samantha",[])
    var result = localStorage.getItem("current_posts")
    result = JSON.parse(result)
    console.log(result.length)

    expect(result.length).toBe(10);
    expect(localStorage.getItem("postState")).toBe("larger");
})

test("load_smaller_posts",async()=>{
    var posts = await loadPostsByUser(1);
    localStorage.setItem("current_posts",JSON.stringify(posts))

    followUser("Antonette",[])
    unfolloUser(2,[{id:1},{id:2},{id:3}])

    var result = localStorage.getItem("current_posts")
    result = JSON.parse(result)
    
    expect(result.length).toBe(10);
    expect(localStorage.getItem("postState")).toBe("smaller");
})