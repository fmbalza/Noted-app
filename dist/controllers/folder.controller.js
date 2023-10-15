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
exports.deleteFolder = exports.updateFolder = exports.getFolderByName = exports.getFolderNotes = exports.getFolders = exports.createFolder = void 0;
const folder_1 = __importDefault(require("../models/folder"));
const note_1 = __importDefault(require("../models/note"));
// crear una carpeta
const createFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, userID } = req.body;
        const newFolder = new folder_1.default({
            name,
            userID,
        });
        const folderSaved = yield newFolder.save();
        return res.status(201).json(folderSaved);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating the folder" });
    }
});
exports.createFolder = createFolder;
// obtener todas las carpetas de un usuario
const getFolders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const folders = yield folder_1.default.find({ userID: req.params.userID }).sort({
            createdAt: -1,
        });
        if (folders) {
            res.status(200).json(folders);
        }
        else {
            res.status(404).json({ message: "Folders not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error getting the folders" });
    }
});
exports.getFolders = getFolders;
// obtener todas las notas de una carpeta
const getFolderNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield note_1.default.find({ folderID: req.params.folderID }).sort({
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
exports.getFolderNotes = getFolderNotes;
// obtener una carpeta por su nombre
const getFolderByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const folder = yield folder_1.default.findOne({ name: name });
        if (folder) {
            res.status(200).json(folder);
        }
        else {
            res.status(404).json({ error: "Folder not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error getting the folder" });
    }
});
exports.getFolderByName = getFolderByName;
// cambiar el nombre de una carpeta
const updateFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { folderID } = req.params;
        const { name } = req.body;
        const updatedFolder = yield folder_1.default.findByIdAndUpdate(folderID, {
            name,
        });
        res.status(204).json(updatedFolder);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating the folder" });
    }
});
exports.updateFolder = updateFolder;
// eliminar una carpeta por su id y sus notas asociadas
const deleteFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let i = 0;
    console.log(i);
    try {
        const { folderID } = req.params;
        console.log(folderID);
        // Eliminar las notas asociadas a la carpeta
        yield note_1.default.deleteMany({ folderID: folderID });
        console.log(i++);
        // Eliminar la carpeta
        yield folder_1.default.findByIdAndDelete(folderID);
        console.log(i++);
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).json({ error: "Error al eliminar la carpeta" });
    }
});
exports.deleteFolder = deleteFolder;
