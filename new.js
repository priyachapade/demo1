
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 2000;


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb+srv://priyachapade09:priya%401234%24chapade%26@cluster0.8upw8md.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error(' MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});
const User = mongoose.model('User', userSchema);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});


app.post('/submit', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.send('User saved successfully!');
  } catch (err) {
    res.status(500).send('Failed to save user');
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
});

app.listen(PORT, () => {
  console.log('Server running at http://localhost:${PORT}');
});
