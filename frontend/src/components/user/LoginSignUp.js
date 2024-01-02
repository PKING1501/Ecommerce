import React, { Fragment, useEffect, useRef,useState } from 'react'
import './LoginSignUp.css'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import FaceIcon from '@material-ui/icons/Face'
import {useDispatch, useSelector} from 'react-redux';
import { clearErrors, login, register } from '../../actions/userAction'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const LoginSignUp = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {error,loading,isAuthenticated} = useSelector((state) => state.user);
    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)


    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const handleTogglePassword1 = () => {
        setShowPassword1((prevShowPassword1) => !prevShowPassword1);
      };
    const handleTogglePassword2 = () => {
        setShowPassword2((prevShowPassword2) => !prevShowPassword2);
      };


    const loginSubmit =(e)=>{
        e.preventDefault();
        
        dispatch(login(loginEmail, loginPassword));
        // console.log("Login Form Submitted");
    }
    
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({     
        name: "",
        email: "",
        password: "",}
        );
        
        const [avatar, setAvatar] = useState("/Profile.png");
        const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
        
        const {name,email,password} = user;
        
        const registerSubmit = (e) =>{
            e.preventDefault();
            const myForm = new FormData();
            myForm.set("name", name);
            myForm.set("email", email);
            myForm.set("password", password);
            myForm.set("avatar", avatar);
            dispatch(register(myForm));
        }
        
        const registerDataChange = (e) => {
            if(e.target.name === 'avatar')
            {
                const reader = new FileReader();
                reader.onload = ()=>{
                    if(reader.readyState === 2)
                    {
                        setAvatarPreview(reader.result);
                        setAvatar(reader.result);
                    }
                };
                reader.readAsDataURL(e.target.files[0]);
            }
            else{
                setUser({...user, [e.target.name]: e.target.value});
            }
        }
        
    const redirect = "/account";
        
    const navigate = useNavigate();
    useEffect(() => {

        if(error){
            alert.error(error);
            dispatch(clearErrors);
        }
        
        if (isAuthenticated) {
          navigate(redirect);
        }
      }, [isAuthenticated, navigate, redirect, alert, error, dispatch]);
 
    const switchTabs = (e, tab)=>{
        if(tab==='login')
        {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if(tab === 'register')
        {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }

  return (
    <Fragment>

        {loading? <Loader/> :
        <Fragment>
            <div className='LoginSignUpContainer'>
                <div className='LoginSignUpBox'>
                    <div>
                        <div className='login_signUp_toggle'>
                            <p  onClick={(e)=>switchTabs(e,"login")}>LOGIN</p>
                            <p  onClick={(e)=>switchTabs(e,"register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                        <div className='loginEmail'>
                            <MailOutlineIcon/>
                            <input 
                            type='email'
                            placeholder='Email'
                            required
                            value={loginEmail}
                            onChange={(e)=>setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className='loginPassword'>
                            <LockOpenIcon />
                            <input
                            type={showPassword1 ? 'text' : 'password'}
                            placeholder='Password'
                            required
                            value={loginPassword}
                            onChange={(e)=>setLoginPassword(e.target.value)}
                            />
                            <div className='eye-icon' onClick={handleTogglePassword1}>
                                {showPassword1 ? (
                                <VisibilityIcon />
                                ) : (
                                <VisibilityOffIcon />
                                )}
                            </div>
                        </div>
                        <Link to='/password/forgot'>Forgot Password ?</Link>
                        <input
                            type='submit'
                            value= 'Login'
                            className='loginBtn'
                            />
                    </form>
                    <form 
                        className='signUpForm'
                        ref={registerTab}
                        encType='multipart/form-data'
                        onSubmit= {registerSubmit}
                        >
                        <div className='signUpName'>
                            <FaceIcon />
                            <input
                                type ='text'
                                placeholder = 'Name'
                                required
                                name = "name"
                                value = {name}
                                onChange = {registerDataChange}
                                />
                        </div>
                        <div className='signUpEmail'>
                            <MailOutlineIcon />
                            <input
                                type='email'
                                placeholder='Email'
                                required
                                name = "email"
                                value={email}
                                onChange={registerDataChange}
                                />
                        </div>
                        <div className='signUpPassword'>
                            <LockOpenIcon />
                            <input
                                type={showPassword2 ? 'text' : 'password'}
                                placeholder='Password'
                                required
                                name = "password"
                                value={password}
                                onChange={registerDataChange}
                                />
                                <div className='eye-icon' onClick={handleTogglePassword2}>
                                    {showPassword1 ? (
                                    <VisibilityIcon />
                                    ) : (
                                    <VisibilityOffIcon />
                                    )}
                                </div>
                        </div>
                        <div className='registerImage'>
                            <img src = {avatarPreview} alt='Avatar Preview'/>
                            <input 
                                type='file' name='avatar' accept='image/*' onChange={registerDataChange} />
                        </div>
                        <input
                            type='submit'
                            value= 'Register'
                            className='signUpBtn'
                            />
                    </form>
                </div>
            </div>
        </Fragment>
        }
    </Fragment>
  )
}

export default LoginSignUp