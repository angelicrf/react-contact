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
        ]

    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

        return (
       <ContactContext.Provider value={{
           contacts: state.contacts
       }}>
           {props.children}
       </ContactContext.Provider>
        );

};

export default ContactState;
