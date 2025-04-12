import { Schema, model, Document } from 'mongoose';


interface IUser extends Document{

    userName: string;
    email: string;
    thoughts: number[];
    friends: number[];
}

const userSchema = new Schema({

    userName: {type: String, unique: true, required: true, trim: true },
    email: {type: String, unique: true, required: true},
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
        }
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'users',
        }
    ],
},
    {
        toJSON:{
            virtuals:true,
        }
    }
)

userSchema.virtual('friendCount')
    .get(function (this: IUser){
        return `${this.friends.length}`
    })

const User = model('user', userSchema)

export default User;