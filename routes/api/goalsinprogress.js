const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const GoalInProgress = require('../../models/GoalInProgress');
const User = require('../../models/User');

// @route   GET api/goalsinprogress
// @desc    GET all goals in progress
// @access  Private
router.get('/', auth, async (req, res) => {
    console.log('get auth:', auth)
    try {
        const goalsinprogress = await GoalInProgress.find().populate('user', ['text']);
        res.json(goalsinprogress);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/goalsinprogress
// @desc    Create or update user goals in progress
// @access  Private
router.post

module.exports = router;