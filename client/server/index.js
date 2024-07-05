const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'photo_gallery'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// User login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ?`;
  db.execute(query, [username], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
           // console.log(user);
          req.session.user = user;
          res.send(`${user.id}`);
        } else {
          res.status(401).send('Invalid credentials');
        }
      });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});
app.put('/photos/update-tags/:id', (req, res) => {
  const photoId = req.params.id;
  const { tags } = req.body;

  if (!tags || tags.length === 0) {
    return res.status(400).json({ error: 'Tags are required' });
  }

  const query = 'UPDATE photos SET tags = ? WHERE id = ?';
  db.execute(query, [tags.join(','), photoId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ success: true });
  });
});

// Photo upload
app.post('/upload', upload.single('photo'), (req, res) => {
    const { user_id, tags } = req.body;
    const photo = req.file.buffer;
    const uploadDate = new Date();
    // console.log(user_id);
    const query = `INSERT INTO photos (user_id, photo, tags, upload_date) VALUES (?, ?, ?, ?)`;
    db.execute(query, [user_id, photo, tags, uploadDate], (err, result) => {
      if (err) throw err;
      res.send('Photo uploaded successfully');
    });
  });

// Fetch user photos
app.get('/photos/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const query = `SELECT * FROM photos WHERE user_id = ?`;
  db.execute(query, [user_id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Serve individual photos
app.get('/photos/image/:id', (req, res) => {
  const { id } = req.params;
  const query = `SELECT photo FROM photos WHERE id = ?`;
  db.execute(query, [id], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.set('Content-Type', 'image/jpeg');
      res.send(results[0].photo);
    } else {
      res.status(404).send('Photo not found');
    }
  });
});

// Search photos
app.get('/search', (req, res) => {
  const { user_id, tags, startDate, endDate } = req.query;
  let query = `SELECT * FROM photos WHERE user_id = ?`;
  const params = [user_id];

  if (tags) {
    query += ` AND tags LIKE ?`;
    params.push(`%${tags}%`);
  }
  if (startDate && endDate) {
    query += ` AND upload_date BETWEEN ? AND ?`;
    params.push(new Date(startDate), new Date(endDate));
  }

  db.execute(query, params, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


// Delete photo
app.delete('/photos/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM photos WHERE id = ?`;
  db.execute(query, [id], (err, result) => {
    if (err) throw err;
    res.send('Photo deleted successfully');
  });
});
app.post('/photos/:id/tags', (req, res) => {
  const { id } = req.params;
  const { tags } = req.body;

  const query = 'UPDATE photos SET tags = ? WHERE id = ?';
  db.execute(query, [tags, id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Tags updated successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
