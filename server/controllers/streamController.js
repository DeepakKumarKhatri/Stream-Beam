const Stream = require('../models/Stream');

exports.startStream = async (req, res) => {
  try {
    const { title, description } = req.body;
    const stream = new Stream({
      user: req.user._id,
      title,
      description,
    });
    await stream.save();
    res.status(201).json(stream);
  } catch (error) {
    res.status(500).json({ error: 'Failed to start stream' });
  }
};

exports.endStream = async (req, res) => {
  try {
    const stream = await Stream.findOne({ user: req.user._id, endTime: null });
    if (!stream) {
      return res.status(404).json({ error: 'No active stream found' });
    }
    stream.endTime = new Date();
    await stream.save();
    res.json(stream);
  } catch (error) {
    res.status(500).json({ error: 'Failed to end stream' });
  }
};

exports.getActiveStreams = async (req, res) => {
  try {
    const streams = await Stream.find({ endTime: null }).populate('user', 'username');
    res.json(streams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch active streams' });
  }
};