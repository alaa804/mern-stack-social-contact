import React , { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
     ADD_CONTACT ,
     CONTACT_ERROR,
     GET_CONTACTS,
     CLEAR_CURRENT,
     CLEAR_FILTER,
     CLEAR_CONTACTS,
     DELETE_CONTACT,
     FILTER_CONTACTS,
     REMOVE_ALERT,
     UPDATE_CONTACT,
     SET_ALERT,
     SET_CURRENT
} from '../types';



const ContactState = props => {
    const initialState = {
      contacts :null,
      current : null,
      filtered :null,
      error : null
    };    
        

    const [state , dispatch] = useReducer(contactReducer , initialState);



// Get Contacts

const getContacts = async () => {

  try {
      const { data  } = await axios.get('/api/contacts' );

      dispatch({ type : GET_CONTACTS , payload : data  });
  } catch (error) {
    dispatch({ type : CONTACT_ERROR , payload : error.response.msg });

  }

} 

    // Add Contact
   const addContact = async contact => {
     const config = {
       headers : {
         'Content-Type': 'application/json'
       }
    }

     try {
         const { data  } = await axios.post('api/contacts' , contact , config);

         dispatch({ type : ADD_CONTACT , payload : data  });
     } catch (error) {
       dispatch({ type : CONTACT_ERROR , payload : error.response.msg });
     }

}
    // Delete Contact
    const deleteContact =  async id => {
      try {
        const { data  } = await axios.delete(`api/contacts/${id}`);

        dispatch({ type : DELETE_CONTACT , payload : id });
    } catch (error) {
      dispatch({ type : CONTACT_ERROR , payload : error.response.msg });
    }
      };

    // Clear Contacts
      const clearContacts = () => {
        dispatch({ type : CLEAR_CONTACTS   });
      }

    // Set Current Contact
    const setCurrent = contact => {
        dispatch({ type : SET_CURRENT , payload : contact  });
      }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type : CLEAR_CURRENT   });
      }


    // Update Contact
    const updateContact = async contact => {
      const config = {
        headers : {
          'Content-Type': 'application/json'
        }
     };
 
      try {
          const { data  } = await axios.put(`api/contacts/${contact._id}`, contact, config);
          dispatch({ type : UPDATE_CONTACT , payload : data   });
      } catch (error) {
        dispatch({ type : CONTACT_ERROR , payload : error.response.msg });
      }
    }

    // Filter Contacts
    const filterContacts = str => {
        dispatch({ type : FILTER_CONTACTS , payload : str   });
      }

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type : CLEAR_FILTER   });
      }

    return (
        <ContactContext.Provider
            value={{
                contacts : state.contacts, 
                current : state.current,
                filtered : state.filtered,
                error : state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                getContacts,
                clearContacts
            }}
        >
          
            { props.children }
        </ContactContext.Provider>
    )
}

export default ContactState;