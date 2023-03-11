import mongoose from 'mongoose';
import { IKata, KataLevel } from '../interfaces/Ikata.interface';

export const kataEntity = () => {

    let kataSchema = new mongoose.Schema<IKata>(
        {
            name: {type: String, required: true},
            description: {type: String, required: true},
            level: {type: String, required: true},
            intents: {type: Number, required: true},
            stars: {type: Number, required: true},
            creator: {type: String, required: true}, // Id of creator
            solution: {type: String, required: true},
            participant: {type: [], required: true},
        }
    )

    return mongoose.models.Katas || mongoose.model<IKata>('Katas', kataSchema)

}