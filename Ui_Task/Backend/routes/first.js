const express = require('express');
const Item = require('../models/first');
const router = express.Router();

// Create 
router.post('/items', async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const newItem = new Item({ name, description, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating item', error });
  }
});

// Get all
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
});

// Get a single
router.get('/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error });
  }
});

// Update
router.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating item', error });
  }
});

// Delete 
router.delete('/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
});

module.exports = router;
