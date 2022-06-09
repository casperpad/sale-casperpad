const express = require("express");
const request = require("request");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

app.use("/api/cors", (req, res, next) => {
  const { query } = req;

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Content-Type", "application/json");

  console.log(req.method);
  if (req.method === "OPTIONS") {
    res.send();
  } else {
    const targetURL = query.url; // Target-URL ie. https://example.com or http://example.com

    console.log(targetURL);

    if (!targetURL) {
      res.status(500).send({
        error: "There is no Target-Endpoint header in the request",
      });
      return;
    }
    request(
      {
        body: req.body,
        url: targetURL,
        method: req.method,
        json: req.body,
        headers: req.headers,
      },
      function (error, response, body) {
        if (error) {
          console.error("error: " + response.statusCode);
        }
        return;
      }
    ).pipe(res);
  }
});

app.use(express.static(path.join(__dirname, "build")));

app.all("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
