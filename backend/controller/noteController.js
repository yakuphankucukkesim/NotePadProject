import Note from "../model/noteModel.js";

export const getAllNotes = async (req, res) => {
    const notes = await Note.find();
    res.status(200).json(notes);
}

export const addNote = async (req, res) => {
    const note = await Note.create({
        title: req.body.title,
        text: req.body.text,
        category: req.body.category
    })
    res.status(200).json(note);
}