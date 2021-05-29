import React , { useContext , useRef , useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';



const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const {  filterContacts , clearFilter , filtered } = contactContext;
    const str = useRef('');

  useEffect(() => {
      if(filtered === null) {
          str.current.value = '';
      }
  })

   const onChange = e => {
    if(str.current.value !== '') {
       filterContacts(e.target.value);
    } else {
        clearFilter();
    }
   }



    return (
     <div className="search">
        <form>
            <input ref={str} type="text" placeholder="search contacts..." onChange={onChange} />
        </form>
     </div> 
    )
}

export default ContactFilter
