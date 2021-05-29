import React , {  useState , useEffect , useContext } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';       
        
const Register = ({ history }) => {
    const [user , setUser] = useState({
        name :'' ,
        email : '',
        password : '' ,
        password2 : ''

    });

    const { name , email , password , password2 } = user;

 const alertContext = useContext(AlertContext);
 const authContext = useContext(AuthContext);

useEffect(() => {
    if(isAuthenticated) {
       history.push('/');
    }
    if(error === 'User Already Exist' ) {
        setAlert(error , "danger")
        clearErrors();
    } 
    // eslint-disable-next-line
},[authContext , history])

 const { setAlert  } = alertContext;
 const { register , error , clearErrors , isAuthenticated } = authContext;

 


    const onChange = e => setUser({...user , [e.target.name] : e.target.value})
    
    const onSubmit = e => {
        e.preventDefault();
        if(name === '' || email === '' || password === '') {
            setAlert("Please fill the missed fields" , "danger");
        } else if (password !== password2) {
          setAlert("password not match" , "danger")
        } else {
            register({
                 name, 
                 email, 
                 password
             })
        }
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
               <div className="form-group">
                 <label htmlFor="name">Name</label>
                  <input type="text"
                   name="name" 
                   value={name} 
                   onChange={onChange} 
                //    required 
                />
              </div>
              <div className="form-group">
                 <label htmlFor="email">Email</label>
                  <input 
                  type="email" name="email" 
                  value={email} 
                  onChange={onChange}
                //    required 
                />
              </div>
              <div className="form-group">
                 <label htmlFor="password">Password</label>
                  <input type="password"
                   name="password" 
                   value={password} 
                   onChange={onChange} 
                //    required 
                   minLength="6" />
              </div>
              <div className="form-group">
                 <label htmlFor="password2">Confirm Password</label>
                  <input type="password" 
                  name="password2" 
                  value={password2} 
                  onChange={onChange} 
                //   required  
                  minLength="6" 
                 />
              </div>
              <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
            <p className="my-1">
             <strong>if you have already an Account ? Go To</strong> <Link to ="/login">Sign in</Link>
            </p>
        </div>
    )
}

export default Register
