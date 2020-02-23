import React, {useReducer} from 'react';
import uuid from 'uuid';
import AuthContext from './authContext';
import AuthReducer from './AuthReducer';

import {REGISTER_SUCCESS , REGISTER_FAIL,
    USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS,
    LOGOUT, CLEAR_ERRORS} from '../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null

    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthContext.Provider value={{
          token: state.token,
            isAuthenticated: satee.isAuthenticated,
            loading: state.user,
            error: state.error
        }}>
            {props.children}
        </AuthContext.Provider>
    );

};

export default AuthState;
