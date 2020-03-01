import React, {useReducer} from 'react';
import axios from 'axios';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';

import {
    ADD_CONTACT, DELETE_CONTACT, CONTACT_ERROR, SET_CURRENT, CLEAR_CURRENT,
    UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER, SET_ALERT, GET_CONTACT,
    REMOVE_ALERT, LOGIN_SUCCESS
} from '../types';

const ContactState = props => {

    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null

    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    const getContact = async () => {

        try{
            const res = await axios.get('http://localhost:30026/api/contacts');
            dispatch({
                type: GET_CONTACT,
                payload: res.data
            });
        }catch (e) {
            dispatch({
                type: CONTACT_ERROR,
                payload: e.response.msg
            })
        }
    };

    const addContact = async (contact) => {
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
            const res = await axios.post('http://localhost:30026/api/contacts', contact, config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data });
        }catch (e) {
            dispatch({
                type: CONTACT_ERROR,
                payload: e.response.data.msg
            })
        }

    };
    const deleteContact = id => {
        dispatch({type: DELETE_CONTACT, payload: id})
    };
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact})
    };
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT})
    };
    const updateContact = contact => {
        dispatch({type: UPDATE_CONTACT, payload: contact})
    };
    const filterContacts = text => {
        dispatch({type: FILTER_CONTACT, payload: text})
    };
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER})
    };
        return (
       <ContactContext.Provider value={{
           contacts: state.contacts,
           current: state.current,
           filtered: state.filtered,
           error: state.error,
           getContact,
           addContact,
           filterContacts,
           clearFilter,
           deleteContact,
           setCurrent,
           clearCurrent,
           updateContact

       }}>
           {props.children}
       </ContactContext.Provider>
        );

};

export default ContactState;
