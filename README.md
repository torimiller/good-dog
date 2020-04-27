# PuppyPal

PuppyPal is an application that gives you the ability to keep track of your dog's training progress. Build a custom set of goals to teach your dog, either by choosing from our list of skills, or creating your own. Each session of training can be logged for each goal. When your pup has mastered the skill, you can add it to your collection of completed goals.


FUNCTIONALITY
PuppyPal's functionality includes:
	Access to demo accounts to try the app out before signing up
	Sign up as a new user
	Login as an existing user
	Ability to create a custom set of goals
    Ability to log training progress for existing goals
	Ability to change goals in progress to completed goals
	Ability to delete goals in progress and completed goals

APPLICATION WEBSITE
View a working prototype here: (https://mysterious-retreat-15685.herokuapp.com/)


SECURITY
	Application uses JWT authentication
	Passwords are encrypted using bcrypt.js


TECHNOLOGY
This is a MERN Stack application, which is comprised of:
    MongoDB
    Express
    React
    Node.js

API Documentation
API endpoints for the back end include:
Auth
	POST to '/api/auth' to authenticate user & get token

Users
    POST to 'api/users' to create a new user

Profile
	GET api/profile/me to get current user's profile
    POST api/profile to create or update user profile
    GET api/profile/user/:user_id to get profile by user ID
    DELETE api/profile to delete profile & user
    PUT api/profile/goalsinprogress to add goals in progress
    PUT api/profile/goalsinprogress/:edu_id to update goal progress
    DELETE api/profile/goalsinprogress/:edu_id to delete goal in progress from profile
    PUT api/profile/completedgoals to add a goal in progress to completed goals
    DELETE api/profile/completedgoals/:edu_id to delete completed goal from profile


Include screenshot(s) of your app. This makes your app description much easier to understand.
DASHBOARD:
