const http = require('http');

let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" }
];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === "GET" && req.url === "/users") {
    res.writeHead(200);
    res.end(JSON.stringify(users));
  } 
  else if (req.method === "POST" && req.url === "/users") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const newUser = JSON.parse(body);
      newUser.id = users.length + 1;
      users.push(newUser);
      res.writeHead(201);
      res.end(JSON.stringify(newUser));
    });
  } 
  else if (req.method === "PUT" && req.url.startsWith("/users/")) {
    const id = parseInt(req.url.split("/")[2]);
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const updatedUser = JSON.parse(body);
      users = users.map(user => user.id === id ? { ...user, ...updatedUser } : user);
      res.writeHead(200);
      res.end(JSON.stringify(users.find(user => user.id === id)));
    });
  } 
  else if (req.method === "DELETE" && req.url.startsWith("/users/")) {
    const id = parseInt(req.url.split("/")[2]);
    users = users.filter(user => user.id !== id);
    res.writeHead(204);
    res.end();
  } 
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

server.listen(3000, () => console.log("Server running on port 3000"));
