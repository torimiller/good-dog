const mongoose = require('mongoose')

const GoalInProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    progress: [
        {
            date: {
                type: Date,
                required: true
            },
            timePracticed: {
                type: String,
                required: true
            },
            notes: {
                type: String,
                required: true
            } 
        }
    ]
});

module.exports = GoalInProgress = mongoose.model('goalinprogress', GoalInProgressSchema);