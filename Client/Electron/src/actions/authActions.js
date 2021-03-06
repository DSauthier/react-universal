import { getSessionAsync, removeSessionAsync } from '../utils/session';
import { fetchUser } from './auth0';

export const loginPending = () => {
    return {
        type: 'LOGIN_PENDING'
    }
}

export const loginSuccess = () => {
    return {
        type: 'LOGIN_SUCCESS'
    }
}

export const loginCancel = () => {
    return {
        type: 'LOGIN_CANCEL'
    }
}

export const loginError = () => {
    return {
        type: 'LOGIN_ERROR'
    }
}

export const logoutPending = () => {
    return {
        type: 'LOGOUT_PENDING'
    }
}

export const logoutSuccess = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

export const logoutError = () => {
    return {
        type: 'LOGOUT_ERROR'
    }
}


export const refreshTokenPending = () => {
    return {
        type: 'REFRESH_TOKEN_PENDING'
    };
};

export const refreshTokenSuccess = (sessionItems) => {
    return {
        type: 'REFRESH_TOKEN_SUCCESS',
        sessionItems
    };
};

export const refreshTokenError = () => {
    return {
        type: 'REFRESH_TOKEN_ERROR'
    };
};

export const loadSessionPending = () => {
    return {
        type: 'LOAD_SESSION_PENDING'
    };
};

export const loadSessionSuccess = (sessionItems) => {
    return {
        type: 'LOAD_SESSION_SUCCESS',
        sessionItems
    };
};

export const loadSessionError = () => {
    return {
        type: 'LOAD_SESSION_ERROR'
    };
};

export const removeSessionPending = () => {
    return {
        type: 'REMOVE_SESSION_PENDING'
    };
};

export const removeSessionSuccess = () => {
    return {
        type: 'REMOVE_SESSION_SUCCESS',
    };
};

export const removeSessionError = () => {
    return {
        type: 'REMOVE_SESSION_ERROR'
    };
};

export const loadSession = () => (dispatch) => {
    dispatch(loadSessionPending())
    getSessionAsync()
    .then(sessionItems => {
        //Check if sessionItems is {} (empty)
        if (Object.keys(sessionItems).length === 0 && sessionItems.constructor === Object) {
            dispatch(loadSessionError());
        } else {
            dispatch(fetchUser(sessionItems.accessToken));
            dispatch(loadSessionSuccess(sessionItems));
        }
    })
    .catch(error => {
        dispatch(loadSessionError());
    })
}

export const removeSession = () => (dispatch) => {
    dispatch(removeSessionPending())
    removeSessionAsync()
    .then(() => {
        dispatch(removeSessionSuccess());
    })
    .catch(error => {
        dispatch(removeSessionError());
    })
}

