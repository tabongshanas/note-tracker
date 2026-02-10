const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Note title is required"]
    },
    note: {
        type: String,
        required: [true, "Note is required"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User must belong to a note.']
    },  
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

noteSchema.pre(/^find/, function(next) {
   this.populate({
        path: 'user',
        select: 'fullname purpose photo'
   })

    next();
})

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;