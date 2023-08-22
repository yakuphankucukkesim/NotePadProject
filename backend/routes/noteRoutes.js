import express from "express";

import { getAllNotes, addNote, deleteNote } from "../controller/noteController.js";

const router = express.Router();

router.get('/', getAllNotes);
router.post('/', addNote);
router.delete('/:id', deleteNote);

export default router;

