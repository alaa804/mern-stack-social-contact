import {
    ADD_CONTACT ,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    CONTACT_ERROR,
    DELETE_CONTACT,
    FILTER_CONTACTS,
    REMOVE_ALERT,
    UPDATE_CONTACT,
    SET_ALERT,
    SET_CURRENT
} from '../types';


export default (state , action) => {
    const { type , payload } = action
    switch(type) {
        case GET_CONTACTS : 
        return {
            ...state,
            contacts : payload,
            loading : false
        }
        case ADD_CONTACT:
        return {
            ...state,
            contacts : [payload ,...state.contacts ],
            loading : false,
        }
        case DELETE_CONTACT:
            return {
                ...state ,
                contacts : state.contacts.filter(contact => contact._id !== payload),
                loading : false
            }
        case CLEAR_CONTACTS :    
        return {
            ...state,
            contacts : null,
            filtred : null,
            error : null,
            current : null 
        }
        case SET_CURRENT :
            return {
                ...state,
                current : payload
            } 
        case CLEAR_CURRENT:
            return {
                ...state,
                current : null
            } 
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts : state.contacts.map(contact => contact._id === payload._id ? payload : contact )
            }  
        case FILTER_CONTACTS :
            return {
                ...state,
                filtered : state.contacts.filter(contact => {
                    const regex = new RegExp(`${payload}` , 'gi');
                    return contact.name.match(regex) || contact.email.match(regex) || contact.phone.match(regex);
                })
            }
        case CLEAR_FILTER :
            return { 
                ...state,
                filtered : null
            }  
        case CONTACT_ERROR :
            return {
                ...state,
                error : payload
            }                  
        default :
      return state;
    }
}
