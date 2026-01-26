const fs = require("fs");
const http = require("http");
const port = 8000;

const makeReq = (req, res) => {
  const url = req.url;
  const method = req.method;
  console.log(url, method);
  try {
    const data = fs.readFileSync("./students.json", "utf8");
    if (method === "GET") {
      if (url === "/students" || url === "/") {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(data);
      }
      if (url === "/grades") {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(data);
      }
      if (url === "/list") {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(data);
      }
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Route not found" }));
    }
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Could not read data file" }));
  }
};

const server = http.createServer(makeReq);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
