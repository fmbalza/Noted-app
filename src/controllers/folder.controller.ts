import e, {Request, Response} from 'express';
import Folder, {IFolder} from '../models/folder';
import Note from '../models/note';

// crear una carpeta
export const createFolder = async (req: Request, res: Response) => {
    try {
        const {name, userID} = req.body;
        const newFolder = new Folder({
            name,
            userID
        });
        const folderSaved = await newFolder.save();
        return res.status(201).json(folderSaved);
    } catch (error) {
        res.status(500).json({error: 'Error creating the folder'});
    }
}

// obtener todas las carpetas de un usuario
export const getFolders = async (req: Request, res: Response) => {
    try {
        const folders = await Folder.find({userID: req.params.userID}).sort({
            createdAt: -1
        });
        if(folders){
            res.status(200).json(folders);
        }else{
            res.status(404).json({message: 'Folders not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Error getting the folders'});
    }
}

// obtener una carpeta por su nombre
export const getFolderByName = async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      const folder = await Folder.findOne({ name: name });
  
      if (folder) {
        res.json(folder);
      } else {
        res.status(404).json({ error: 'Carpeta no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la carpeta' });
    }
  };

// cambiar el nombre de una carpeta
export const updateFolder = async (req: Request, res: Response) => {
    try {
        const {folderId} = req.params;
        const {name} = req.body;
        const updatedFolder = await Folder.findByIdAndUpdate(folderId, {
            name
        });
        res.status(204).json(updatedFolder);
    } catch (error) {
        res.status(500).json({error: 'Error updating the folder'});
    }
}

// eliminar una carpeta por su id y sus notas asociadas
export const deleteFolder = async (req: Request, res: Response) => {
    try {
        const { folderId } = req.params;
        // Eliminar las notas asociadas a la carpeta
        await Note.deleteMany({ folder_id: folderId });
        // Eliminar la carpeta
        await Folder.findByIdAndDelete(folderId);
        res.sendStatus(204);
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la carpeta' });
}
}