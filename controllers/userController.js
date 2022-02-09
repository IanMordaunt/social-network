const req = require('express/lib/request');
const { User } = require('../models');
const { populate } = require('../models/Thoughts');

module.exports = {

  // Get All Users
  getUsers(req, res) {
    User.find()
    .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a Single User
  getSingleUser(req, res) {
    console.log(req.params.userId)
    User.findOne({ _id: req.params.userId })
    .select('-__v')
    .populate('friends')
    .populate('thoughts')
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      }
        
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a New User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // // Update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId }, 
      {$set: req.body},
      { runValidators: true, new: true }
    )
    
    .then((user) =>{
      !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user) 
    })
        .then(() => res.json({ message: 'User updated!'}))
        .catch((err) => res.status(500).json(err));
  },
  

  // // Delete a user and associated apps
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
       
        if(!user){
          return res.status(404).json({ message: 'No user with that ID' })
        }

      })
      .then(() => res.json({ message: 'User and associated thougths deleted!'}))
      .catch((err) => res.status(500).json(err));
  },


  // // Add a Friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId }, 
      {$push: {friends: req.params.friendId }},
      {new: true}
    )

    .then((user) =>{
      !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user) 
    }
          
        )
        .then(() => res.json({ message: 'Friend added to User!'}))
        .catch((err) => res.status(500).json(err));
  },

  // // Delete a Friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId }, 
      {$pull: {friends: req.params.friendId }},
      {new: true}
    )
   
    .then((user) =>{
      !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user) 
    }
          
        )
        .then(() => res.json({ message: 'Friend deleted from User!'}))
        .catch((err) => res.status(500).json(err));
  },


};
