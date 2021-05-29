import React , { useContext , Fragment , useEffect } from 'react';
import { CSSTransition , TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import Loader from '../layout/Loader';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';



const Contacts = () => {

    const contactContext = useContext(ContactContext);
    const { contacts , filtered , getContacts , loading } = contactContext;

    useEffect(() => {
      getContacts();
      // eslint-disable-next-line
    },[]);
    

    if(contacts !== null && contacts.length === 0 && !loading) {
      return <h4 className="contact">Please Add Your Informations Contact...</h4>;
    }

    return (
        <Fragment>
          { contacts !== null && !loading ? (
             <TransitionGroup>
             { filtered !== null 
             ? filtered.map(contact => (
                 <CSSTransition key={contact._id} timeout={500} classNames="item">
                      <ContactItem 
                      contact={contact} />
                 </CSSTransition>
                 ))
             :  contacts.map(contact => (
                 <CSSTransition key={contact._id} timeout={500} classNames="item">
                   <ContactItem  contact={contact}  />   
                 </CSSTransition>    
                 ))}
           </TransitionGroup>  
          ) : <Loader /> }  
        </Fragment>
    )
}

Contacts.propTypes = {
contacts : PropTypes.array.isRequired,
}

export default Contacts