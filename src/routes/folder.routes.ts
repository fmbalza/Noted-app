import { Router } from "express";
const router = Router();

import { createFolder, getFolders, getFolderByName, deleteFolder, updateFolder } from "../controllers/folder.controller";

router.post('/folders', createFolder);
router.get('/folders/:userID', getFolders);
router.get('/folders/:name', getFolderByName);
router.delete('/folders/:folderID', deleteFolder);
router.put('/folders/:folderID', updateFolder);

export default router;