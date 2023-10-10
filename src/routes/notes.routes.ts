import { Router } from "express";
const router = Router();

import { createNote, getNotes, getNote, deleteNote, updateNote } from "../controllers/note.controller";

router.post('/notes', createNote);
router.get('/notes/:userID', getNotes);
router.get('/notes/:noteID', getNote);
router.delete('/notes/:noteID', deleteNote);
router.put('/notes/:noteID', updateNote);

export default router;