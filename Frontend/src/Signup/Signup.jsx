// import Navbar from '../component/Navbar';
// import googleImage from '../assets/Google-image.png';
import {useState} from 'react';
import './Signup.css';
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai';
import React from 'react';
import { validateEmail } from '../../utils/validate';
import { Link,useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

function Signup(){

    const [email,setEmail] = useState("");
    const [orgPassword,setOrgPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [role,setRole] = useState("");
    const [orgVisible,setOrgVisible] = useState(false);
    const [confirmVisible,setConfirmVisible] = useState(false);
    const [error,setError] = useState(null);

    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();

        if(!validateEmail(email)){
            setError("Please provide valid Email address.");
            return;
        }
        if(!orgPassword){
            setError("Please provide the Password.");
            return;
        }
        if(!confirmPassword){
            setError("Please provide the Confirm Password");
            return;
        }
        if(!role){
            setError("Please provide the role");
            return;
        }
        setError("");

        //Signup API
        try{
            const response = await axiosInstance.post("/api/auth/signup",{
                email,
                orgPassword,
                confirmPassword,
                role
                
            });

            // console.log(response);
            // console.log(response.data);

            if(response.data && response.data.error){
                setError(response.data.error.message);
            }

            if(response.data && response.data.token){
                const role = response.data.role;
                localStorage.setItem("token",response.data.token);
                if(role === "creater"){
                    navigate("/eventInfo");
                }
                if(role === "player"){
                    navigate("/playerInfo");
                }
                alert(response.data.message);
            }
        }
        catch(err){
            if(err.response && err.response.data && err.response.data.message){
                setError(err.response.data.message);
            }
            else{
                setError("Unexpected error occured please try again");
            }
        }


    }
    function handleEmail(event){
        setEmail(event.target.value);
    }
    function handleOrgPassword(event){
        setOrgPassword(event.target.value);
    }
    function handleConfirmPassword(event){
        setConfirmPassword(event.target.value);
    }
    function toggleVisibility1(){
        setOrgVisible((prev)=>!prev);
    }
    function toggleVisibility2(){
        setConfirmVisible((prev)=>!prev);
    }
    function handleRole(event){
        setRole(event.target.value);
    }




    
    return( <>
                
                <div className="container1">
                <div className="inside1">
                    <form onSubmit={handleSubmit}>
                        <h1 className='signup'>Signup</h1>
                        <div className='input-email'>
                            <input type="email" 
                                   placeholder='Email'
                                   onChange={handleEmail}
                                   value={email} />
                        </div>
                        <div className="input-password">
                            <input type={orgVisible ? "text" : "password"} 
                                   placeholder='Create password'
                                   onChange={handleOrgPassword}
                                   value={orgPassword} />
                                   {
                                    orgVisible ? <AiOutlineEye className='eye-icon' onClick={toggleVisibility1}/> : <AiOutlineEyeInvisible className='eye-icon' onClick={toggleVisibility1}/>
                                   }
                        </div>
                        <div className="input-confirmPassword">
                            <input type={confirmVisible ? "text":"password"} 
                                   placeholder='Confirm password'
                                   onChange={handleConfirmPassword}
                                   value={confirmPassword} />
                                   {
                                    confirmVisible ? <AiOutlineEye className='eye-icon' onClick = {toggleVisibility2}/> : <AiOutlineEyeInvisible className='eye-icon'
                                    onClick=
                                    {toggleVisibility2}
                                    />
                                   }
                        </div>
                        <div className="input-role">
                            <input type="text" 
                            placeholder='creater or player'
                            value={role}
                            onChange={handleRole}
                            />
                        </div>
                        <p className="error-message">{error}</p>
                        <button className='signup-btn' type='submit'>Signup</button>
                        <p>Already have an account?<span><Link to="/login">Login</Link></span></p>
                    </form>
                    {/* <div>
                        <h2>Or</h2>
                        <button className='google-btn'>
                            <span><img src={googleImage} alt="" className='google-image'/></span>
                            Signup with Google
                        </button>
                    </div> */}
                </div>
            </div>
            </>)
}
export default Signup;