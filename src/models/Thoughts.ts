import { Schema, model, Document } from 'mongoose';

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Schema.Types.ObjectId[];
}

// Schema to create Post model
const postSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reacts',
      },
    ],
    username: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `upvoteCount` that gets the amount of comments per user
postSchema
  .virtual('reactionCount')
  // Getter
  .get(function (this: IThought) {
    return this.reactions.length
  });

// Initialize our Post model
const Thoughts = model('thoughts', postSchema);

export default Thoughts;