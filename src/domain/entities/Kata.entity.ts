import mongoose from 'mongoose';

export const kataEntity = () => {

    let userSchema = new mongoose.Schema(
        {
            name: String,
            description: String,
            level: Number,
            user: String,
            date: Date,
            valoration: Number,
            chances: Number
        }
    )

    return mongoose.model('Users', userSchema)

}