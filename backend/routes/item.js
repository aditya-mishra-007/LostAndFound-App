const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const auth = require('../middleware/auth');

// GET /api/items/search?name=xyz 
// NOTE: This must be above /:id so Express doesn't confuse "search" for an ID.
router.get('/search', auth, async (req, res) => {
  try {
    const { name } = req.query;
    // Search by item name (case-insensitive) [cite: 13, 17]
    const items = await Item.find({ itemName: { $regex: name, $options: 'i' } });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/items -> Add item 
router.post('/', auth, async (req, res) => {
  try {
    const newItem = new Item({ ...req.body, user: req.user.id });
    const item = await newItem.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/items -> View all items 
router.get('/', auth, async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/items/:id -> View item by ID 
router.get('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/items/:id -> Update item 
router.put('/:id', auth, async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    
    // Ensure only owner can update [cite: 14]
    if (item.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized access' }); // Required error 

    item = await Item.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/items/:id -> Delete item 
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Ensure only owner can delete [cite: 14]
    if (item.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized access' }); // Required error 

    await item.deleteOne();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;