import React, {useReducer} from 'react';
import axios from 'axios';
import uuid from 'uuid';
import AuthContext from './authContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../util/setAuthToken';

import {REGISTER_SUCCESS , REGISTER_FAIL,
    USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS,
    LOGIN_FAIL,CLEAR_ERRORS, LOGOUT} from '../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const loadUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try{
            const res = await axios.get('http://localhost:30026/api/auth');
            dispatch({
                type:USER_LOADED,
                payload: res.data
            })
        }catch (e) {
          dispatch({
              type: AUTH_ERROR
          })
        }
    };
    const login = async formData => {
        const config = {
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
                'Content-Type': 'application/json',
                "Clear-Site-Data": "*",
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            }
        };
        try {

            const res = await axios.post('http://localhost:30026/api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser();

        } catch (e) {
            dispatch({
                type: LOGIN_FAIL,
                payload: e.response.data.msg
            })
        }
    };

        const logout = () => {
        dispatch({
            type: LOGOUT
        })
    };

    const clearErrors = () => {
       dispatch({
           type: CLEAR_ERRORS
       })
    };

     const register = async formData => {
       const config = {
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type',
                 'Access-Control-Max-Age': '86400',
                'Content-Type': 'application/json',
                "Clear-Site-Data": "*",
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            }
        };
        try{

            const res = await axios.post('http://localhost:30026/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            loadUser();

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
            user:state.user,
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
