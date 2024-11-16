

import { Schema, model } from 'mongoose';

const tokenResetSchema = new Schema({
    idUser: String,
    token: String,
    expires: Date,
    createdAt: Date,
});

export const TokenResetModel = model('TokenReset', tokenResetSchema);