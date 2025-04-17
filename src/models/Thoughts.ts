import { Schema, model, Document, ObjectId, Types } from 'mongoose';

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions?: typeof reactionSchema[];
}


interface IReaction extends Document{
  reactionId: ObjectId;
  reactionBody: string;
  userName: string;
  createdAt: Date;
}

const reactionSchema = new Schema<IReaction>({

  reactionId: { type: Schema.Types.ObjectId,default: () => new Types.ObjectId(),},
  reactionBody: {type:String, required: true, maxlength: 280},
  userName: {type:String, required: true},
  createdAt: {type:Date, default: Date.now}

},  {
  toJSON: {
    getters: true,
  },
  id: false,
});


// Schema to create Post model
const thoughtsSchema = new Schema<IThought>(
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
      reactionSchema
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
thoughtsSchema
  .virtual('reactionCount')
  // Getter
  .get(function (this: IThought) {
    return this.reactions?.length?? 0
  });

// Initialize our Post model
const Thoughts = model('thoughts', thoughtsSchema);

export default Thoughts;