const { User, Thought } = require('../models');

module.exports = {

  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a Single Thought
  getSingleThought(req, res) {
   Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: 'No thought with this ID!' })
          : res.json(thought)
      })
      .catch((err) => res.status(500).json(err));
  },

//  Create a Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

// Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this ID!' })
          : User.deleteMany({ _id: { $in: thought.user } })
      )
      .then(() => res.json({ message: 'User and thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this ID!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      {$push: {reactions: req.body}},
      { runValidators: true, new: true }
    )
    .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this ID!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      {$pull: {reactions: {reactionsId: req.params.reationId}}},
      {new: true }
    )
    .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this ID!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    
  }
  


};





