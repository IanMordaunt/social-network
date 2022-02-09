const { Schema, model, Types } = require('mongoose');


// Schema to create user model
const UsersSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property 'friendCount' that gets and sets the user's friend count
UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// Initialize User model
const User = model('User', UsersSchema)

module.exports = User;