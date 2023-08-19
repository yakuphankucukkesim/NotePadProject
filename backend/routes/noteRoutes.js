import express from "express";

import { getAllNotes, addNote } from "../controller/noteController.js";

const router = express.Router();

router.get('/', getAllNotes);
router.post('/', addNote);

export default router;

