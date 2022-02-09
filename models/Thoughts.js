const { Schema, model, Types } = require('mongoose');

const dateFormat = require('../utils/dateFormat')

// Subdocument schema
const ReactionsSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createAtFig) => dateFormat(createAtFig),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false
  }
);


const ThoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createAtFig) => dateFormat(createAtFig)
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionsSchema],
  },
  {
    toJSON: {
      viturals: true,
      getters: true,
    },
    id: false,
  }
);



ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtsSchema);

module.exports = Thought
