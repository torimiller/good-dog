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
            type: String,
            //required: true
        },
        progress: [
            {
                date: {
                    type: Date,
                    //required: true
                },
                timepracticed: {
                    type: String,
                    //required: true
                },
                notes: {
                    type: String,
                    //required: true
                }
            }
        ], 
    }
    ],
    completedgoals: [
        {
        goal: {
            type: String,
            //required: true
        },
        progress: [
            {
                date: {
                    type: Date,
                    //required: true
                },
                timepracticed: {
                    type: String,
                    //required: true
                },
                notes: {
                    type: String,
                    //required: true
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