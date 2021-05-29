import React , { Fragment } from 'react';
import loader from './spinner.gif';


const Loader = () => {
  return (
     <Fragment>
        <img src={loader} 
        alt="loading..."  
        style={{ width : '200px' , margin : 'auto' , display:'block'}} />
    </Fragment>
  )
  
}

export default Loader

