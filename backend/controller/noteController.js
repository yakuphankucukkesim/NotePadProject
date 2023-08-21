import Note from "../model/noteModel.js";

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Error fetching notes' });
    }
}

export const addNote = async (req, res) => {
    const { title, text, category } = req.body;

    // error verirse burasi hatali

    // if (!title || !text || !category) {
    //     return res.status(400).json({ message: 'Title, text, and category must be provided' });
    // }

    try {
        const newNote = await Note.create({
            title,
            text,
            category
        });
        res.status(201).json(newNote);
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ message: 'Error adding note' });
    }
}