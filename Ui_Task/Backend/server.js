const express = require('express');
const mongoose = require('mongoose');

// Initialize
const app = express();

//JSON middleware 
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// User model 
const User = mongoose.model('User', userSchema);

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Get all users from MongoDB
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send('Error retrieving users');
  }
});

// new user in MongoDB
app.post('/users', async (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).send('Name is required');
  }

  try {
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send('Error creating user');
  }
});

// Update user ID 
app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).send('Name is required');
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.name = name;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Error updating user');
  }
});

// Delete 
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).send('Error deleting user');
  }
});

// Set the server 
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
