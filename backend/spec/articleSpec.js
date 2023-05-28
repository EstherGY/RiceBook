var request = require("request");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

describe("add article tests", function () {
  it("should successfully add article", function (done) {
    const j = request.jar();
    const cookie = request.cookie("sid=tc");
    const url = "http://localhost:3000/article";
    j.setCookie(cookie, url);
    request(
      {
        url: "http://localhost:3000/article",
        method: "POST",
        json: true,
        headers: {
          "content-type": "application/json",
        },
        jar: j,
        body: {
          text: "add new text2",
        },
      },
      function (error, response, body) {
        let articles = body["articles"];
        for (var i = 0; i < articles.length; i++) {
          let article = articles[i];
          if (article.author === "tc" && article.text === "add new text2") {
            expect("pass").toEqual("pass");
            done();
          }
        }
      }
    );
  });
});

describe("get article tests", function () {
  it("should fetch all articles of current users", function (done) {
    const j = request.jar();
    const cookie = request.cookie("sid=tc");
    const url = "http://localhost:3000/article";
    j.setCookie(cookie, url);
    request(
      {
        url: "http://localhost:3000/article",
        method: "GET",
        json: true,
        headers: {
          "content-type": "application/json",
        },
        jar: j,
        body: {},
      },
      function (error, response, body) {
        let articles = body["articles"];
        for (var i = 0; i < articles.length; i++) {
          let article = articles[i];
          if (article.author != "tc") {
            expect("pass").toEqual("fail");
            done();
          }
        }
      }
    );
  });
});

describe("get article tests", function () {
  it("should fetch one articles of id", function (done) {
    const j = request.jar();
    const cookie = request.cookie("sid=tc");
    const url = "http://localhost:3000/article/1";
    j.setCookie(cookie, url);
    request(
      {
        url: "http://localhost:3000/article",
        method: "GET",
        json: true,
        headers: {
          "content-type": "application/json",
        },
        jar: j,
        body: {},
      },
      function (error, response, body) {
        let articles = body["articles"];
        expect(articles[0].pid).toEqual(1);
      }
    );
  });
});
