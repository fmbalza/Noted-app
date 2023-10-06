import { Document, Schema, model } from 'mongoose';
import { IUser } from './user';

// interfaz de la carpeta
export interface IFolder extends Document {
    name: string;
    userID: IUser['_id'];
}

const folderSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    userID:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

export default model<IFolder>('Folder', folderSchema);