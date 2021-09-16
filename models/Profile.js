const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    dogName: {
        type: String
    },
    goalsinprogress: [
        {
        goal: {
            type: String
        },
        progress: [
            {
                date: {
                    type: Date
                },
                timepracticed: {
                    type: String
                },
                notes: {
                    type: String
                }
            }
        ], 
    }
    ],
    completedgoals: [
        {
        goal: {
            type: String
        },
        progress: [
            {
                date: {
                    type: Date
                },
                timepracticed: {
                    type: String
                },
                notes: {
                    type: String
                }
            }
        ], 
    }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);