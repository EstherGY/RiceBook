var request = require("request");
describe("register with new users tests", function () {
  it("should login correctly", function (done) {
    request(
      {
        url: "http://localhost:3000/register",
        method: "POST",
        json: true,
        headers: {
          "content-type": "application/json",
        },
        body: {
          username: "testUser",
          password: "123",
          email: "testUser@123.com",
          zipcode: "91230-121",
          dob: "1989-12-11",
        },
      },
      function (error, response, body) {
        expect(body["result"]).toEqual("success");
        done();
      }
    );
  });
});

describe("login tests", function () {
  it("should login correctly", function (done) {
    request(
      {
        url: "http://localhost:3000/login",
        method: "POST",
        json: true,
        headers: {
          "content-type": "application/json",
        },
        body: {
          username: "testUser",
          password: "123",
        },
      },
      function (error, response, body) {
        expect(body["result"]).toEqual("success");
        done();
      }
    );
  });
});

describe("logout tests", function () {
  it("should login correctly", function (done) {
    const j = request.jar();
    const cookie = request.cookie("sid=tc");
    const url = "http://localhost:3000/logout";
    j.setCookie(cookie, url);
    request(
      {
        url: "http://localhost:3000/logout",
        method: "PUT",
        json: true,
        headers: {
          "content-type": "application/json",
        },
        jar: j,
        body: {},
      },
      function (error, response, body) {
        console.log(response["statusCode"]);
        done();
      }
    );
  });
});
