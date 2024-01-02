import React, { Fragment, useEffect,useState } from 'react'
import './UpdatePassword.css'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/Loader'
import {useDispatch, useSelector} from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/userAction'
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
// import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockOpen from '@material-ui/icons/LockOpen';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error, isUpdated, loading} = useSelector((state)=>state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);


    const handleTogglePassword1 = () => {
        setShowPassword1((prevShowPassword1) => !prevShowPassword1);
      };
    const handleTogglePassword2 = () => {
        setShowPassword2((prevShowPassword2) => !prevShowPassword2);
      };
    const handleTogglePassword3 = () => {
        setShowPassword3((prevShowPassword3) => !prevShowPassword3);
      };

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
      
        dispatch(updatePassword(myForm));
      };
    
        const redirect = "/account";
            
        const navigate = useNavigate();
        useEffect(() => {

            if(error){
                alert.error(error);
                dispatch(clearErrors());
            }

            if (isUpdated) {
                alert.success("Password Updated Successfully");
                navigate(redirect);
                dispatch({
                    type: UPDATE_PASSWORD_RESET,
                });
            }
        }, [isUpdated, error, alert, navigate, dispatch ]);



  return (
    <Fragment>
                {loading ? <Loader /> :
                (<Fragment>
                    <MetaData title={"Change Password"} />
                    <div className='updatePasswordContainer'>
                        <div className='updatePasswordBox'>
    
                            <h2>Change Password</h2>
                            <form 
                                className='updatePasswordForm'
                                onSubmit= {updatePasswordSubmit}
                                >
                                <div className='loginPassword'>
                                    <VpnKeyIcon />
                                    <input
                                    type={showPassword1 ? 'text' : 'password'}
                                    placeholder='Old Password'
                                    required
                                    value={oldPassword}
                                    onChange={(e)=>setOldPassword(e.target.value)}
                                    />
                                    <div className='eye-icon' onClick={handleTogglePassword1}>
                                        {showPassword1 ? (
                                        <VisibilityIcon />
                                        ) : (
                                        <VisibilityOffIcon />
                                        )}
                                    </div>
                                </div>
                                <div className='loginPassword'>
                                    <LockOpen />
                                    <input
                                    type={showPassword2 ? 'text' : 'password'}
                                    placeholder='New Password'
                                    required
                                    value={newPassword}
                                    onChange={(e)=>setNewPassword(e.target.value)}
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
                                    value= 'Update'
                                    className='updatePasswordBtn'
                                    />
                            </form>
    
                        </div>
                    </div>
                </Fragment>)
                }
            </Fragment>
  )
}

export default UpdatePassword