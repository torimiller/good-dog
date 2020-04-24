const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
//const Post = require('../../models/Post');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        // user pertains to the Profile model user field, which is going to be the objectId of the user
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', 
        ['name', 'dogName']
        );

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', [ auth ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            dogName
        } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(dogName) profileFields.dogName = dogName;

        try {
            let profile = await Profile.findOne({ user: req.user.id });
            
            if(profile) {
                // Update profile
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            // Create profile
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

// @route   GET api/profile/user/:user_id
// @desc    GET profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        
        if(!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/profile
// @desc    Delete profile & user
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // remove users posts
        //await Post.deleteMany({ user: req.user.id });

        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });

        //Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
        console.log('User deleted')
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   PUT api/profile/goalsinprogress
// @desc    Add goals in progress
// @access  Private
router.put('/goalsinprogress', [ auth, [
    // check('goal', 'Goal is required').not().isEmpty(),
    // check('date', 'Date is required').not().isEmpty(),
    // check('timepracticed', 'Time practiced is required').not().isEmpty(),
    // check('notes', 'Notes are required').not().isEmpty()
]], async (req, res) => {
    // const errors = validationResult(req);
    // if(!errors.isEmpty) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const {
        goal,
        progress
    } = req.body;

    const newEdu = {
        goal,
        progress
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // unshift is the same as push except it pushes it to the beginning, not the end
        profile.goalsinprogress.unshift(newEdu);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/profile/goalsinprogress/:edu_id
// @desc    Update goal progress
// @access  Private
router.put('/goalsinprogress/:edu_id', auth, async (req, res) => {
    const {
        date,
        timepracticed,
        notes
    } = req.body;

    const newProgress = {
        date,
        timepracticed,
        notes
    }

    try {
        // getting the profile of the logged in user
        const profile = await Profile.findOne({ user: req.user.id });
        
        const updateIndex = profile.goalsinprogress.map(item => item.id).indexOf(req.params.edu_id);

        profile.goalsinprogress[updateIndex].progress.push(newProgress)


        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/profile/goalsinprogress/:edu_id
// @desc    Delete goal in progress from profile
// @access  Private
router.delete('/goalsinprogress/:edu_id', auth, async (req, res) => {
    try {
        // getting the profile of the logged in user
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.goalsinprogress.map(item => item.id).indexOf(req.params.exp_id);

        // splicing out the index
        profile.goalsinprogress.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/profile/completedgoals
// @desc    Add completed goal
// @access  Private
router.put('/completedgoals', [ auth, [
    // check('goal', 'Goal is required').not().isEmpty(),
    // check('date', 'Date is required').not().isEmpty(),
    // check('timepracticed', 'Time practiced is required').not().isEmpty(),
    // check('notes', 'Notes are required').not().isEmpty()
]], async (req, res) => {
    // const errors = validationResult(req);
    // if(!errors.isEmpty) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const {
        goal,
        progress
    } = req.body;

    const newGoal = {
        goal,
        progress
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // unshift is the same as push except it pushes it to the beginning, not the end
        profile.completedgoals.unshift(newGoal);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   DELETE api/profile/completedgoals/:edu_id
// @desc    Delete completed goal from profile
// @access  Private
router.delete('/completedgoals/:edu_id', auth, async (req, res) => {
    try {
        // getting the profile of the logged in user
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.completedgoals.map(item => item.id).indexOf(req.params.exp_id);

        // splicing out the index
        profile.completedgoals.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;