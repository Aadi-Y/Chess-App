// import Navbar from "../component/Navbar";
import './Login.css';
// import googleImage from '../assets/Google-image.png';
import { AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import { validateEmail } from "../../utils/validate";
import axiosInstance from "../../utils/axiosInstance";
import Signup from '../Signup/Signup';

function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [visible,setVisible] = useState(false);
    const [error,setError] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();

        if(!validateEmail(email)){
            setError("Please provide valid Email address.");
            return;
        }

        if(!password){
            setError("Please provide the Password");
            return;
        }

        
        setError("");


        try{
            const response = await axiosInstance.post("/api/auth/login",{
                email:email,
                password:password
            });

            if(response.data && response.data.token){
                const role = response.data.user.role;
                localStorage.setItem("token",response.data.token)
                if(role === "player"){
                    navigate("/playerInfo")
                }
                else{
                    navigate("/eventInfo");
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

    async function getUserInfo(){
        try{
            const response = await axiosInstance.get("/get-user");

            if(response.data && response.data.users){
                setEmail(response.data.users[0].email)
            }
            else{
                setEmail('G');
            }
        }
        catch(err){
            if(err.response && err.response.data){
                console.log(err);
            }
        }
    }

    // useEffect(()=>{
    //     getUserInfo();
    //     return () => {};
    // },[handleSubmit])

    function handleEmail(event){
        setEmail(event.target.value);
    }
    function handlePassword(event){
        setPassword(event.target.value);
    }
    function toggleVisibility(){
        setVisible((prev)=>!prev);
    }

    
    
    return( <>
                {/* <Navbar/> */}

                <div className="container2">
                    <div className="inside2">
                        <div className="inside2.1">
                            <h2 className="login">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="input-email">
                                    <input type="email" 
                                        placeholder="Email"
                                        onChange={handleEmail}
                                        value={email} />
                                </div>
                                <div className="input-password">
                                    <input type={visible ? "text" : "password"}
                                        placeholder="Password"
                                        onChange={handlePassword}
                                        value={password} 
                                        />
                                        {
                                            visible? <AiOutlineEye className="eye-icon" onClick={toggleVisibility}/> :
                                            <AiOutlineEyeInvisible className="eye-icon" onClick={toggleVisibility}/>
                                        }
                                    
                                </div>
                                <p className="error-message">{error}</p>
                                <a href="">Forgot Password?</a>
                                <div className="control">
                                    <button className="login-btn" type="submit">Login</button>
                                </div>
                                <p>Don't have an account? <span><Link to="/signup">Signup</Link></span></p>
                            </form>
                            {/* <div>
                                <h3>Or</h3>
                                <button className="google-btn">
                                    <span><img src={googleImage}alt="" className="google-image" /></span>
                                    Login with Google
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </>)
}
export default Login;