import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR, 
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        console.log('getCurrentProfile err:', err);
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get all profiles
export const getProfiles = () => async dispatch => {
    console.log('getProfiles ran');
    dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {    
    console.log('getProfileById ran')
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Create or update a profile
// passing in a history object, which has a method called "push", that will redirect to a client-side route
export const createProfile = (formData, history, edit = false) => async dispatch => {
    console.log('createProfile ran')
    console.log('createProfile formData', formData)
    console.log('createProfile history', history)
    console.log('createProfile edit', edit)
    try {
        console.log('try catch in createProfile ran')

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if(!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
}

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));

        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
}

// Add Goal In Progress
export const addGoalInProgress = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/goalinprogress', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Goal In Progress Added', 'success'));

        history.push('/dashboard');
    } catch (err) {
        console.log('err.response:', err.response)
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
}

// Add Education
export const addEducation = (formData, history) => async dispatch => {
    console.log('addEducation action formData:', formData)
    try {
        console.log('addEducation try block ran');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));

        history.push('/dashboard');
    } catch (err) {
        console.log('err.response:', err.response)
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
}

// Delete experience
export const deleteExperience = id => async dispatch => {
    console.log('deleteExperience ran')
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
};

// Delete goal in progress
export const deleteGoalInProgress = id => async dispatch => {
    console.log('deleteGoalInProgress ran')
    try {
        const res = await axios.delete(`/api/profile/goalinprogress/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
};

// Update education
export const updateEducation = (id, progress) => async dispatch => {
    console.log('actions updateEducation ran')
    console.log('updateEducation id:', id)
    console.log('updateEducation progress:', progress)
    try {
        console.log('updateEducation try catch ran')
        const res = await axios.put(`/api/profile/education/${id}`, progress);
        console.log('updateEducation res.data:', res.data)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education Updated', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
};


// Delete education
export const deleteEducation = id => async dispatch => {
    console.log('actions deleteEducation ran')
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Goal Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
};

// Add to Completed Goals
export const addCompletedGoal = (goal, id) => async dispatch => {
    console.log('addCompletedGoal action goal:', goal)
    try {
        console.log('addCompletedGoal try block ran');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/completedgoals', goal, config);
        console.log('addCompletedGoal res:', res)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        try {
            const res = await axios.delete(`/api/profile/education/${id}`);
    
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            })
    
            dispatch(setAlert('Goal Removed', 'success'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            }); 
        }

        dispatch(setAlert('Completed Goal Added', 'success'));
    } catch (err) {
        console.log('err:', err)
        console.log('err.response:', err.response)
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
}

// Delete account & profile
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: ACCOUNT_DELETED })
    
            dispatch(setAlert('Your account has been permanently deleted'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            }); 
        }
    }
  
};