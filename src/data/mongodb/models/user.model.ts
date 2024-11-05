
// modelo de usuario

import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    roles: [String],

});

export const UserModel = model('User', userSchema);