import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR, 
    UPDATE_PROFILE
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
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {    
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
    try {
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

// Add Goal in Progress
export const addGoalInProgress = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/goalsinprogress', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Goal In Progress Added', 'success'));

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

// Update goalsinprogress
export const updateGoalInProgress = (id, progress) => async dispatch => {
    try {
        const res = await axios.put(`/api/profile/goalsinprogress/${id}`, progress);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Goal in Progress Updated', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
};


// Delete goal in progress
export const deleteGoalInProgress = id => async dispatch => {
    if(window.confirm('Are you sure you want to delete this goal?')) {
        try {
            const res = await axios.delete(`/api/profile/goalsinprogress/${id}`);
    
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
    }
};

// Add to Completed Goals
export const addCompletedGoal = (goal, id) => async dispatch => {
    if(window.confirm('Are you sure your dog has mastered this skill?')) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
    
            const res = await axios.put('/api/profile/completedgoals', goal, config);
    
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
    
            try {
                const res = await axios.delete(`/api/profile/goalsinprogress/${id}`);
        
                dispatch({
                    type: UPDATE_PROFILE,
                    payload: res.data
                })
            } catch (err) {
                dispatch({
                    type: PROFILE_ERROR,
                    payload: { msg: err.response.statusText, status: err.response.status }
                }); 
            }
    
            dispatch(setAlert('Completed Goal Added', 'success'));
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
}


// Delete completed goal
export const deleteCompletedGoal = id => async dispatch => {
    if(window.confirm('Are you sure you want to delete this goal?')) {
        try {
            const res = await axios.delete(`/api/profile/completedgoals/${id}`);
    
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
    }  
};


// Delete account & profile
// export const deleteAccount = () => async dispatch => {
//     if(window.confirm('Are you sure? This can NOT be undone!')) {
//         try {
//             await axios.delete('/api/profile');

//             dispatch({ type: CLEAR_PROFILE })
//             dispatch({ type: ACCOUNT_DELETED })
    
//             dispatch(setAlert('Your account has been permanently deleted'));
//         } catch (err) {
//             dispatch({
//                 type: PROFILE_ERROR,
//                 payload: { msg: err.response.statusText, status: err.response.status }
//             }); 
//         }
//     }
// };