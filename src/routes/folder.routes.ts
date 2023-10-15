import { Router } from "express";
const router = Router();

import {
  createFolder,
  getFolders,
  getFolderByName,
  deleteFolder,
  updateFolder,
  getFolderNotes,
} from "../controllers/folder.controller";

router.post("/folders", createFolder);
router.get("/folders/user/:userID", getFolders);
router.get("/folders/name/:name", getFolderByName);
router.get("/folders/:folderID", getFolderNotes);
router.delete("/folders/:folderID", deleteFolder);
router.put("/folders/:folderID", updateFolder);

export default router;
