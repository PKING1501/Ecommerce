import React, { Fragment, useEffect,useState } from 'react'
import './ResetPassword.css'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/Loader'
import {useDispatch, useSelector} from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction'
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import LockIcon from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {token} = useParams();
    const {error, success, loading} = useSelector((state)=>state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    const handleTogglePassword2 = () => {
        setShowPassword2((prevShowPassword2) => !prevShowPassword2);
      };
    const handleTogglePassword3 = () => {
        setShowPassword3((prevShowPassword3) => !prevShowPassword3);
      };

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
      
        dispatch(resetPassword(token, myForm));
      };
            
        const navigate = useNavigate();
        useEffect(() => {

            if(error){
                alert.error(error);
                dispatch(clearErrors());
            }

            if (success) {
                alert.success("Password Updated Successfully");
                navigate("/login");
            }
        }, [success, error, alert, navigate, dispatch ]);

  return (
    <Fragment>
        {loading ? <Loader /> :
        (<Fragment>
            <MetaData title={"Change Password"} />
            <div className='resetPasswordContainer'>
                <div className='resetPasswordBox'>

                    <h2>Change Password</h2>
                    <form 
                        className='resetPasswordForm'
                        onSubmit= {resetPasswordSubmit}
                        >
                        <div>
                            <LockOpen />
                            <input
                            type={showPassword2 ? 'text' : 'password'}
                            placeholder='New Password'
                            required
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                            <div className='eye-icon' onClick={handleTogglePassword2}>
                                {showPassword2 ? (
                                <VisibilityIcon />
                                ) : (
                                <VisibilityOffIcon />
                                )}
                            </div>
                        </div>
                        <div className='loginPassword'>
                            <LockIcon/>
                            <input
                            type={showPassword3 ? 'text' : 'password'}
                            placeholder='Confirm Password'
                            required
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            />
                            <div className='eye-icon' onClick={handleTogglePassword3}>
                                {showPassword3 ? (
                                <VisibilityIcon />
                                ) : (
                                <VisibilityOffIcon />
                                )}
                            </div>
                        </div>
                        <input
                            type='submit'
                            value= 'Reset'
                            className='resetPasswordBtn'
                            />
                    </form>

                </div>
            </div>
        </Fragment>)
        }
    </Fragment>
  )
}

export default ResetPassword