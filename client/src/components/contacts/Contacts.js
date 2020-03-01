import React,{useContext, Fragment, useEffect} from 'react';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from "./ContactItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Spinner from "../layout/Spinner";

const Contacts =() => {
    const contactContext = useContext(ContactContext);
    const {contacts, filtered, getContact, loading } = contactContext;

    useEffect(() => {
        getContact();

        // eslint-disable-next-line
    },[]);

    if(contacts !== null && !loading && contacts.length === 0) {
        return <h4>Please add a contact</h4>
    }
    return (
            <Fragment>
                {contacts !== null && !loading ? (
                    <TransitionGroup>
                        {filtered !== null ? filtered.map(contact =>
                            (<CSSTransition key={contact._id} timeout={500} classNames="item">
                                <ContactItem contact={contact}/>
                            </CSSTransition> )) :  contacts.map(contact => (
                            <CSSTransition key={contact._id} timeout={500} classNames="item">
                                <ContactItem contact={contact}/>
                            </CSSTransition> ))
                        }
                    </TransitionGroup>
                ) : <Spinner/>}

            </Fragment>

        );
};

export default Contacts;
