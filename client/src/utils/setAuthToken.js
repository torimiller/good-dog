import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        // the token we pass in is going to come from local storage
        // if there is a token, we're going to set the global header using axios
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;