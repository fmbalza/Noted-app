import e, { Request, Response } from "express";
import Folder, { IFolder } from "../models/folder";
import Note from "../models/note";

// crear una carpeta
export const createFolder = async (req: Request, res: Response) => {
  try {
    const { name, userID } = req.body;
    const newFolder = new Folder({
      name,
      userID,
    });
    const folderSaved = await newFolder.save();
    return res.status(201).json(folderSaved);
  } catch (error) {
    res.status(500).json({ error: "Error creating the folder" });
  }
};

// obtener todas las carpetas de un usuario
export const getFolders = async (req: Request, res: Response) => {
  try {
    const folders = await Folder.find({ userID: req.params.userID }).sort({
      createdAt: -1,
    });
    if (folders) {
      res.status(200).json(folders);
    } else {
      res.status(404).json({ message: "Folders not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting the folders" });
  }
};

// obtener todas las notas de una carpeta
export const getFolderNotes = async (req: Request, res: Response) => {

  try {
    const notes = await Note.find({ folderID: req.params.folderID }).sort({
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

// obtener una carpeta por su nombre
export const getFolderByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const folder = await Folder.findOne({ name: name });

    if (folder) {
      res.status(200).json(folder);
    } else {
      res.status(404).json({ error: "Folder not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting the folder" });
  }
};

// cambiar el nombre de una carpeta
export const updateFolder = async (req: Request, res: Response) => {
  try {
    const { folderID } = req.params;
    const { name } = req.body;
    const updatedFolder = await Folder.findByIdAndUpdate(folderID, {
      name,
    });
    res.status(204).json(updatedFolder);
  } catch (error) {
    res.status(500).json({ error: "Error updating the folder" });
  }
};

// eliminar una carpeta por su id y sus notas asociadas
export const deleteFolder = async (req: Request, res: Response) => {
  let i = 0;
  console.log(i);
  try {
    const { folderID } = req.params;
    console.log(folderID);
    // Eliminar las notas asociadas a la carpeta
    await Note.deleteMany({ folderID: folderID });
    console.log(i++);
    // Eliminar la carpeta
    await Folder.findByIdAndDelete(folderID);
    console.log(i++);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la carpeta" });
  }
};
