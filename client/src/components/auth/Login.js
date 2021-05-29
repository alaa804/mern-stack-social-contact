import React , {  useState , useContext , useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';




const Login = ({ history }) => {

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const {  login , isAuthenticated , clearErrors, error , loading } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if(isAuthenticated) {
       history.push('/');
    }
    if(error === 'Invalid Credentials' ) {
        setAlert(error , "danger")
        clearErrors();
    } 
    // eslint-disable-next-line
},[authContext , history])



    const [user , setUser] = useState({
        email : '',
        password : '' 
    });

    const {  email , password } = user;

    const onChange = e => setUser({...user , [e.target.name] : e.target.value})
    
    const onSubmit = e => {
        e.preventDefault();
        if(email === '' || password === '') {
              setAlert("please fill All fields" , "danger")
        } else {
            login({
                email, 
                password,
            })
        }
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            { loading && <Loader />}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                 <label htmlFor="email">Email</label>
                  <input type="email" name="email" value={email} onChange={onChange} />
              </div>
              <div className="form-group">
                 <label htmlFor="password">Password</label>
                  <input type="password" name="password" value={password} onChange={onChange} />
              </div>
              <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form> 

         <p className="my-1">
             <strong>if you d'ont have an account? Go To</strong> <Link to ="/register">Sign Up</Link>
          </p>  
        </div>
    )
}

export default Login