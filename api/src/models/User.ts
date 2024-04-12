import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  nb_game: number;
  wins : [{}]
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nb_game : {type: Number, required:false, default:0},
  wins : {type:Array, default:[]}
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
