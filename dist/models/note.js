"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// definir el esquema de la nota
const noteSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    folderID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Folder',
        required: false
    }
});
// exportar el modelo de la nota
exports.default = (0, mongoose_1.model)('Note', noteSchema);
