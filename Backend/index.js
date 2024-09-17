import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Secret key for JWT signing and encryption
const JWT_SECRET = "your_secret_key";

// Dummy in-memory user storage
const users = [];

// Function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
};

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

// User registration route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) return res.status(400).send("User already exists");

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);

  res.send("User registered");
});

// User login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).send("Invalid username or password");

  // Validate password
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Invalid username or password");

  // Generate JWT
  const token = generateToken(user.id);
  res.header("Authorization", token).send({ token });
});

// Protected route
app.get("/protected", authenticateToken, (req, res) => {
  res.send("Access granted to protected resource");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
