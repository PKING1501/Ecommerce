import React, { Fragment, useEffect,useState } from 'react'
import './UpdateProfile.css'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/Loader'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import FaceIcon from '@material-ui/icons/Face'
import {useDispatch, useSelector} from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction'
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {user} = useSelector((state)=> state.user);
    const {error, isUpdated, loading} = useSelector((state)=>state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        
        // Check if avatar is not null before adding it to FormData
        if (avatar !== null) {
            myForm.append("avatar", avatar); // Assuming avatar is a File object
          }
      
        dispatch(updateProfile(myForm));
      };
    
    const updateProfileDataChange = (e) => {
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
    
        const redirect = "/account";
            
        const navigate = useNavigate();
        useEffect(() => {
            if(user){
                setName(user.name);
                setEmail(user.email);
                setAvatarPreview(user.avatar.url || "/Profile.png");
            }

            if(error){
                alert.error(error);
                dispatch(clearErrors());
            }

            if (isUpdated) {
                alert.success("Profile Updated Successfully");
                dispatch(loadUser());
                navigate(redirect);
                dispatch({
                    type: UPDATE_PROFILE_RESET,
                });
            }
        }, [isUpdated, error, alert, navigate, dispatch, user ]);


        return (
            <Fragment>
                {loading ? <Loader /> :
                (<Fragment>
                    <MetaData title={"Update Profile"} />
                    <div className='updateProfileContainer'>
                        <div className='updateProfileBox'>
    
                            <h2>Update Profile</h2>
                            <form 
                                className='updateProfileForm'
                                 encType='multipart/form-data'
                                onSubmit= {updateProfileSubmit}
                                >
                                <div className='updateProfileName'>
                                    <FaceIcon />
                                    <input
                                        type ='text'
                                        placeholder = 'Name'
                                        required
                                        name = "name"
                                        value = {name}
                                        onChange = {(e)=>setName(e.target.value)}
                                        />
                                </div>
                                <div className='updateProfileEmail'>
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
                                <div className='updateProfileImage'>
                                    <img src = {avatarPreview} alt='Avatar Preview'/>
                                    <input 
                                        type='file' name='avatar' accept='image/*' onChange={updateProfileDataChange} />
                                </div>
                                <input
                                    type='submit'
                                    value= 'Update'
                                    className='updateProfileBtn'
                                    />
                            </form>
    
                        </div>
                    </div>
                </Fragment>)
                }
            </Fragment>
        )
        }

export default UpdateProfile