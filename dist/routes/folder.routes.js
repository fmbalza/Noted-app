"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const folder_controller_1 = require("../controllers/folder.controller");
router.post("/folders", folder_controller_1.createFolder);
router.get("/folders/user/:userID", folder_controller_1.getFolders);
router.get("/folders/name/:name", folder_controller_1.getFolderByName);
router.get("/folders/:folderID", folder_controller_1.getFolderNotes);
router.delete("/folders/:folderID", folder_controller_1.deleteFolder);
router.put("/folders/:folderID", folder_controller_1.updateFolder);
exports.default = router;
