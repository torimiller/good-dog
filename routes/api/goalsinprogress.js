const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const GoalInProgress = require('../../models/GoalInProgress');
const User = require('../../models/User');


// @route   POST api/goalsinprogress
// @desc    Create a goal in progress
// @access  Private
router.post('/', [ auth, [
    check('text', 'Text is required').not().isEmpty()
] ], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
         // will give us the user without sending the password
        const user = await User.findById(req.user.id).select('-password');

        const newGoalInProgress = new GoalInProgress ({
            text: req.body.text,
            imgUrl: req.body.imgUrl,
            alt: req.body.alt,
            user: req.user.id
        });

        const goalinprogress = await newGoalInProgress.save();

        res.json(goalinprogress);
    } catch (err) {
       console.error(err.message) 
       res.status(500).send('Server error');
    }
});

// @route   GET api/goalsinprogress
// @desc    Get all goals in progress
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
       const goalsinprogress = await GoalInProgress.find().sort({ date: -1 });
       res.json(goalsinprogress); 
    } catch (err) {
        console.error(err.message) 
        res.status(500).send('Server error'); 
    }
});

// @route   GET api/goalsinprogress/:id
// @desc    Get goal in progress by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
       const goalinprogress = await GoalInProgress.findById(req.params.id);

        if(!goalinprogress) {
            return res.status(404).json({ msg: 'Goal not found' });
        }

       res.json(goalinprogress); 
    } catch (err) {
        console.error(err.message) 
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Goal not found' });
        }
        res.status(500).send('Server error'); 
    }
});

// @route   DELETE api/goalinprogress/:id
// @desc    Delete a goal by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
       const goalinprogress = await GoalInProgress.findById(req.params.id);

       if(!goalinprogress) {
        return res.status(404).json({ msg: 'Goal not found' });
    }

        // Check user
        // check if the user is not equal to req.user.id which is the logged in user
        // goalinprogress.user is an ObjectId, not a string. Needs to be a string to match req.user.id
        // toString() converts the ObjectId to a string
        if(goalinprogress.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await goalinprogress.remove();

       res.json({ msg: 'Goal removed' }); 
    } catch (err) {
        console.error(err.message) ;
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Goal not found' });
        }
        res.status(500).send('Server error'); 
    }
});

// @route   POST api/goalsinprogress/progress/:id
// @desc    Add progress to a goal
// @access  Private
router.post('/progress/:id', [ auth, [
    //check('date', 'Date is required').not().isEmpty()
] ], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
         // will give us the user without sending the password
        const user = await User.findById(req.user.id).select('-password');
        const goalinprogress = await GoalInProgress.findById(req.params.id);

        const newProgress = {
            date: req.body.date,
            timePracticed: req.body.timePracticed,
            notes: req.body.notes,
            user: req.user.id
        };

        goalinprogress.progress.unshift(newProgress);

        await goalinprogress.save();

        res.json(goalinprogress.progress);
    } catch (err) {
       console.error(err.message) 
       res.status(500).send('Server error');
    }
});

// @route   DELETE api/goalsinprogress/progress/:id/:progress_id
// @desc    Delete progress entry
// @access  Private
router.delete('/progress/:id/:progress_id', auth, async (req, res) => {
    try {
        const post = await GoalInProgress.findById(req.params.id);

        // Pull out progress
        const progress = goalinprogress.progress.find(progress => progress.id === req.params.progress_id);

        // Make sure progress exists
        if(!progress) {
            return res.status(404).json({ msg: 'Progress does not exist' });
        }

        // Check user
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Get remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.error(err.message) 
        res.status(500).send('Server error');
    }
});

module.exports = router;