const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
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
    }
});

module.exports = Skill = mongoose.model('skill', SkillSchema);