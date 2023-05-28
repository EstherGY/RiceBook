var request = require("request");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

describe("update headline", function () {
    it("should update headline of current user", function (done) {
      const j = request.jar();
      const cookie = request.cookie("sid=tc");
      const url = "http://localhost:3000/headline";
      j.setCookie(cookie, url);
      request(
        {
          url: "http://localhost:3000/headline",
          method: "PUT",
          json: true,
          headers: {
            "content-type": "application/json",
          },
          jar: j,
          body: {
              headline:"Happy"
          },
        },
        function (error, response, body) {
          let headline = body["headline"];
          expect(headline).toEqual("Happy");
        }
      );
    });
  });

describe("get headline", function () {
  it("should get headline of current user", function (done) {
    const j = request.jar();
    const cookie = request.cookie("sid=tc");
    const url = "http://localhost:3000/headline/tc";
    j.setCookie(cookie, url);
    request(
      {
        url: "http://localhost:3000/headline/tc",
        method: "GET",
        json: true,
        headers: {
          "content-type": "application/json",
        },
        jar: j,
        body: {
        },
      },
      function (error, response, body) {
        let headline = body["headline"];
        expect(headline).toEqual("Happy");
      }
    );
  });
});