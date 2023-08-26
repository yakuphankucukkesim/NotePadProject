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

export const deleteNote = async (req, res) => {
    const noteId = req.params.id;

    try {
        const deletedNote = await Note.findByIdAndDelete(noteId);
        if (deletedNote) {
            res.status(200).json({ message: 'Note deleted successfully' });
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        console.error('Error deleting note', error);
        res.status(500).json({ message: 'Error deleting note' });
    }
}

export const editNote = async (req, res) => {
    const noteId = req.params.id;
    const { title, text, category } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            { title, text, category },
            { new: true }
        );

        if (updatedNote) {
            res.status(200).json(updatedNote);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        console.error('Error editing note', error);
        res.status(500).json({ message: 'Error editing note' });
    }
};