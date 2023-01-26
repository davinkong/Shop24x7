import Note from "../models/noteModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id});
  
  res.json(notes);
});

//@description     Fetch single product
//@route           GET /api/notes/:id
//@access          Public
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});

//@description     Create product
//@route           GET /api/notes/create
//@access          Private
const CreateNote = asyncHandler(async (req, res) => {
  const { name, qty, price } = req.body;

  if (!name || !qty || !price) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const note = new Note({ user: req.user._id, name, qty, price });
    
    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});



//@description     Delete product
//@route           GET /api/notes/:id
//@access          Private
const DeleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  // if (note.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (note) {
    await note.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});



// @desc    Update a product
// @route   PUT /api/notes/:id
// @access  Private
const UpdateNote = asyncHandler(async (req, res) => {
  const { name, qty, price } = req.body;

  const note = await Note.findById(req.params.id);

  // if (note.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (note) {
    note.name = name;
    note.qty = qty;
    note.price = price;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

export { getNoteById, getNotes, CreateNote, DeleteNote, UpdateNote };
