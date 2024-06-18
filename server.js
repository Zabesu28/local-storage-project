import express from 'express';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const app = express();
const dbPath = ':memory:';
const db = new sqlite3.Database(dbPath);


// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    key: "localstorage_user_id",
    secret: "s3cr3t_cloud_campusDFS",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

// Créer la table des utilisateurs
db.serialize(() => {
  db.run(
    "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
  );
});

// Routes
app.post("/register", (req, res) => {
  console.log("oooo");
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    function (err) {
      if (err) {
        return res
          .status(500)
          .send("Erreur lors de l'enregistrement de l'utilisateur");
      }
      res.status(201).send("Utilisateur enregistré avec succès");
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      return res.status(500).send("Erreur lors de la connexion");
    }
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .send("Nom d'utilisateur ou mot de passe incorrect");
    }
    console.log(res)
    req.session.user = {
      id: user,
      username: user.username,
    };
    res.status(200).send({
      id: user.id,
      username: user.username,
    });
  });
});

app.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.localstorage_user_id) {
    res.clearCookie('localstorage_user_id');
    res.send("Déconnexion réussie")
  } else {
    res.status(400).send("Utilisateur non connecté");
  }
});

app.get("/checkAuth", (req, res) => {
  if (req.session.user && req.cookies.localstorage_user_id) {
    res.send(req.session.user);
  } else {
    res.status(401).send("Non autorisé");
  }
});

app.listen(5000, () => {
  console.log("Server démarré sur le port 5000");
});
