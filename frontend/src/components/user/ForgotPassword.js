import React, { Fragment, useEffect,useState } from 'react'
import './ForgotPassword.css'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/Loader'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import {useDispatch, useSelector} from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction'
// import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error, message, loading} = useSelector((state)=>state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        
        const myForm = new FormData();
        myForm.set("email", email);
      
        dispatch(forgotPassword(myForm));
      };

    //   const redirect = "/account";
            
    //   const navigate = useNavigate();
      useEffect(() => {

          if(error){
              alert.error(error);
              dispatch(clearErrors());
          }

          if (message) {
              alert.success(message);
          }
      }, [message, error, alert, dispatch]);



  return (
    <Fragment>
                {loading ? <Loader /> :
                (<Fragment>
                    <MetaData title={"Forgot Password"} />
                    <div className='forgotPasswordContainer'>
                        <div className='forgotPasswordBox'>
    
                            <h2>Forgot Password</h2>
                            <form 
                                className='forgotPasswordForm'
                                onSubmit= {forgotPasswordSubmit}
                                >
                                <div className='forgotPasswordEmail'>
                                    <MailOutlineIcon />
                                    <input
                                        type='email'
                                        placeholder='Email'
                                        required
                                        name = "email"
                                        value={email}
                                        onChange = {(e)=>setEmail(e.target.value)}
                                        />
                                </div>
                                <input
                                    type='submit'
                                    value= 'Send'
                                    className='forgotPasswordBtn'
                                    />
                            </form>
    
                        </div>
                    </div>
                </Fragment>)
                }
            </Fragment>
  )
}

export default ForgotPassword