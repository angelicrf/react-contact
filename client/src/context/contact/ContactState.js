import React, {useReducer} from 'react';
import uuid from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';

import {ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT,
        UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER, SET_ALERT,
        REMOVE_ALERT} from '../types';

const ContactState = props => {

    const initialState = {
        contacts: [
            {
                id:1,
                name: 'John Williams',
                email: 'johnW@gmail.com',
                phone: '123-321-4433',
                type: 'personal'
            },
            {
                id:2,
                name: 'George McKenzi',
                email: 'mcjhgW@gmail.com',
                phone: '163-387-4763',
                type: 'personal'
            },
            {
                id:3,
                name: 'Andy Kalham',
                email: 'andKol@gmail.com',
                phone: '654-098-9854',
                type: 'professional'
            },
        ],
        current: null,
        filtered: null

    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);
    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact })
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
