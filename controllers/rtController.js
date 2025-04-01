const RT = require('../models/rt');
const User = require('../models/user');

exports.createRT = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const author = req.user.userId;
    const rt = new RT({ title, content, tags, author });
    await rt.save();
    res.status(201).json(rt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRTs = async (req, res) => {
  try {
    const rts = await RT.find().populate('author', 'username');
    res.json(rts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRTById = async (req, res) => {
  try {
    const rtId = req.params.id;
    const rt = await RT.findById(rtId).populate('author', 'username');
    if (!rt) {
      return res.status(404).json({ message: 'RT not found' });
    }
    res.json(rt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRT = async (req, res) => {
  try {
    const rtId = req.params.id;
    const updates = req.body;
    const rt = await RT.findByIdAndUpdate(rtId, updates, { new: true });
    if (!rt) {
      return res.status(404).json({ message: 'RT not found' });
    }
    res.json(rt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRT = async (req, res) => {
  try {
    const rtId = req.params.id;
    const rt = await RT.findByIdAndDelete(rtId);
    if (!rt) {
      return res.status(404).json({ message: 'RT not found' });
    }
    res.json({ message: 'RT deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markAsFavorite = async (req, res) => {
  try {
    const rtId = req.params.id;
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user.favorites.includes(rtId)) {
      user.favorites.push(rtId);
      await user.save();
    }
    res.json({ message: 'RT marked as favorite' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};