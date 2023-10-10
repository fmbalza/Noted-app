"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNote = exports.getNotes = exports.createNote = void 0;
const note_1 = __importDefault(require("../models/note"));
// crear una nota
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let i = 0;
    console.log(i);
    try {
        const { title, content, userID, folderID } = req.body;
        console.log(userID);
        const newNote = new note_1.default({
            title: title,
            content: content,
            userID: userID,
            folderID: folderID === "" ? null : folderID, // si folderID es vacio, se guarda null
        });
        console.log(newNote);
        const noteSaved = yield newNote.save();
        console.log(i++);
        return res.status(201).json(noteSaved);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating the note" });
    }
    return res.status(201).json({ message: "Note Saved" });
});
exports.createNote = createNote;
// obtener todas las notas de un usuario
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield note_1.default.find({ userID: req.params.userID }).sort({
            createdAt: -1,
        });
        if (notes) {
            res.status(200).json(notes);
        }
        else {
            res.status(404).json({ message: "Notes not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error getting the notes" });
    }
});
exports.getNotes = getNotes;
// obtener una nota por su id
const getNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield note_1.default.findById(req.params.noteID);
        if (note) {
            res.status(200).json(note);
        }
        else {
            res.status(404).json({ message: "Note not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error getting the note" });
    }
});
exports.getNote = getNote;
// actualizar una nota por su id
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { noteID } = req.params;
        const { title, content, folderID } = req.body;
        const updatedNote = yield note_1.default.findByIdAndUpdate(noteID, {
            title,
            content,
            folderID: folderID === "" ? null : folderID,
        });
        if (updatedNote) {
            res.status(200).json({ message: "Note Updated", updatedNote });
        }
        else {
            res.status(404).json({ message: "Note not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error updating the note" });
    }
});
exports.updateNote = updateNote;
// eliminar una nota por su id
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedNote = yield note_1.default.findByIdAndDelete(req.params.noteID);
        if (deletedNote) {
            res.status(200).json({ message: "Note Deleted", deletedNote });
        }
        else {
            res.status(404).json({ message: "Note not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting the note" });
    }
});
exports.deleteNote = deleteNote;
