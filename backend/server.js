import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = router.db.get("users").value();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) res.status(200).json(user);
  else res.status(401).json({ message: "Invalid credentials" });
});

server.use(router);
server.listen(5000, () => console.log("🚀 JSON Server running on port 5000"));
