import { Schema, model, Document } from 'mongoose';
import { IUser } from './user';
import { IFolder } from './folder';

// interfaz de la nota
export interface INote extends Document {
    title: string;
    content: string;
    userID: IUser['_id'];
    folderID: null | IFolder['_id'];
}

// definir el esquema de la nota
const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content:{
        type: String,
        required: true,
        trim: true
    },
    userID:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    folderID:{
        type: Schema.Types.ObjectId,
        ref: 'Folder',
        required: false
    }
},
{
    versionKey: false,
    timestamps: true
});

// exportar el modelo de la nota
export default model<INote>('Note', noteSchema);