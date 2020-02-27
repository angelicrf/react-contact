import React, {useReducer} from 'react';
import axios from 'axios';
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
    const loadUser = () => {
        console.log('LoadingUser');
    };
    const login = () => {
        console.log('login');
    };
    const logout = () => {
        console.log('logout');
    };

    const clearErrors = () => {
        console.log('clearErrors');
    };

     const register = async formData => {
       const config = {
            headers: {
                'Content-Type': 'application/json',
                "Clear-Site-Data": "*"
            }
        };
        try{

            const res = await axios.post('/api/users', formData, config);

            console.log('res.data is:', res.data);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })

        }catch (e) {
           dispatch({
               type: REGISTER_FAIL,
               payload: e.response.data.msg
           })
        }
    };
    return (
        <AuthContext.Provider value={{
          token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.user,
            error: state.error,
            register,
            loadUser,
            login,
            logout,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    );

};

export default AuthState;
