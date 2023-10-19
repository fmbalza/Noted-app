import { Request, Response } from "express";
import Note, { INote } from "../models/note";

// crear una nota
export const createNote = async (req: Request, res: Response):Promise<Response> => {
  let i = 0;
  console.log(i);
  try {
    const { title, content, userID, folderID } = req.body;
    console.log(userID);
    const newNote = new Note({
      title: title,
      content: content,
      userID: userID,
      folderID: folderID === "" ? null : folderID, // si folderID es vacio, se guarda null
    });
    console.log(newNote);
    const noteSaved = await newNote.save();
    console.log(i++);
    return res.status(201).json(noteSaved);
  } catch (error) {
    return res.status(500).json({ error: "Error creating the note", e: error });
  }
  
};

// obtener todas las notas de un usuario
export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({ userID: req.params.userID }).sort({
      createdAt: -1,
    });
    if (notes) {
      res.status(200).json(notes);
    } else {
      res.status(404).json({ message: "Notes not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting the notes" });
  }
};

// obtener una nota por su id
export const getNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.noteID);
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting the note" });
  }
};

// actualizar una nota por su id
export const updateNote = async (req: Request, res: Response) => {
  try {
    const { noteID } = req.params;
    const { title, content, folderID } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(noteID, {
      title,
      content,
      folderID: folderID === "" ? null : folderID,
    });
    if (updatedNote) {
      res.status(200).json({ message: "Note Updated", updatedNote });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating the note" });
  }
};

// eliminar una nota por su id
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.noteID);
    if (deletedNote) {
      res.status(200).json({ message: "Note Deleted", deletedNote });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting the note" });
  }
};
