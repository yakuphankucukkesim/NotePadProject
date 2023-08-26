import express from "express";

import { getAllNotes, addNote, deleteNote, editNote } from "../controller/noteController.js";

const router = express.Router();

router.get('/', getAllNotes);
router.post('/', addNote);
router.delete('/:id', deleteNote);
router.put('/:id', editNote);

export default router;

