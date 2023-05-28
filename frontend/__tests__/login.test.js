import { login, isUserExisting, addUser } from "../src/LandingView/data";
import { logOut} from "../src/MainView/mainServer";

global.fetch = require("node-fetch");

test("load_usrs_existing", async () => {
  var result = await isUserExisting("Leanne Graham");
  expect(result).toBe(true);
});

test("load_usrs_non_existing", async () => {
  var result = await isUserExisting("asd Graham");
  expect(result).toBe(false);
});

test("add_user", async () => {
  var user = {
    id: 11,
    name: "Leanne Graham",
    username: "Bret",
    email: "tst@11.com",
    address: {
      street: "testlecun",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };
  var result = await addUser(user);
  expect(result).toBe(false);
});

test("add_user_existing", async () => {
  var user = {
    id: 11,
    name: "Lecun T",
    username: "Bret",
    email: "tst@11.com",
    address: {
      street: "testlecun",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };
  var result = await addUser(user);
  expect(result).toBe(true);
});

test("forget password", async () => {
  var result = await login("Bret", "Kadaght");
  expect(result).toBe(false);
});

it("login with correct validation", async () => {
  var result = await login("Bret", "Kulas Light");
  expect(result).toBe(true);
});

it("login with successful state", async () => {
  var result = await login("Bret", "Kulas Light");
  var state = localStorage.getItem("loginState");
  expect(state).toBe("login");
});

it("login with error state", async () => {
  var result = await login("Bret", "Kulaasdadht");
  var state = localStorage.getItem("loginState");
  expect(state).toBe("error");
});



test("logout",() => {
  logOut()
  var state = localStorage.getItem("loginState");
  expect(state).toBe("logout");
});