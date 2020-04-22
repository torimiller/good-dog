// const express = require('express');
// const router = express.Router();
// const auth = require('../../middleware/auth');
// const { check, validationResult } = require('express-validator/check');

// const Skill = require('../../models/Skill');
// const User = require('../../models/User');

// // @route   GET api/goalsinprogress
// // @desc    Get all goals in progress
// // @access  Private
// router.get('/', auth, async (req, res) => {
//     try {
//        const skills = await Skills.find().sort({ date: -1 });
//        res.json(skills); 
//     } catch (err) {
//         console.error(err.message) 
//         res.status(500).send('Server error'); 
//     }
// });

// module.exports = router;