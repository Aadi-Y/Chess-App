import React from 'react'
import "./UserRegistration.css";
import {useState,useEffect} from "react";
import axiosInstance from '../../utils/axiosInstance';
function UserRegistration({handleClose,handleGettingPlayer,playerData,type}) {
    const [playerName,setPlayerName] = useState(playerData?.playerName || "");
    const [playerFIDE_id,setPlayerFIDE_id] = useState(playerData?.playerFIDE_id || "");
    const [playerAICF_id,setPlayerAICF_id] = useState(playerData?.playerAICF_id || "");
    const [playerEmail,setPlayerEmail] = useState(playerData?.playerEmail || "");
    const [playerDOB,setPlayerDOB] = useState(playerData?.playerDOB || "");
    const [playerMobile,setPlayerMobile] = useState(playerData?.playerMobile || "");
    const [playerQualification,setPlayerQualification] = useState(playerData?.playerQualification || "");
    const [playerAddress,setPlayerAddress] = useState(playerData?.playerAddress || "");
    const [searchValue,setSearchValue] = useState("");

    function handleName(e){
        setPlayerName(e.target.value);
    }

    function handleFIDE(e){
        setPlayerFIDE_id(e.target.value);
    }

    function handleAICF(e){
        setPlayerAICF_id(e.target.value);
    }

    function handleEmail(e){
        setPlayerEmail(e.target.value);
    }

    function handleDOB(e){
        setPlayerDOB(e.target.value);
    }

    function handleMobile(e){
        setPlayerMobile(e.target.value);
    }

    function handleQualification(e){
        setPlayerQualification(e.target.value);
    }

    function handleAddress(e){
        setPlayerAddress(e.target.value);
    }

    function handleSearch(e){
        setSearchValue(e.target.value);
    }

    // function handleDOB(){
    //     return playerDOB.split('-').reverse().join('-');
    // }

    // useEffect(()=>{
    //     handleDOB()
    // },[playerDOB])

    async function handleRegister(e){
        e.preventDefault();

            try{
                const response = await axiosInstance.post("/add-player",{
                    playerName,
                    playerFIDE_id,
                    playerAICF_id,
                    playerEmail,
                    playerDOB,
                    playerMobile,
                    playerQualification,
                    playerAddress
                });

                if(response.data){
                    handleClose();
                    handleGettingPlayer();
                    alert(response.data.message);
                }
            }catch(error){
                console.log(error.response.data.message);
            }
        
    }

    async function handleUpdate(){
        const playerId = playerData._id;
        try{
            const response = await axiosInstance.put("/update-player/" + playerId ,{
                playerName,
                playerFIDE_id,
                playerAICF_id,
                playerEmail,
                playerDOB,
                playerMobile,
                playerQualification,
                playerAddress
            });

            if(response.data){
                handleClose();
                handleGettingPlayer();
                alert(response.data.message)
            }

            
        }
        catch(error){
            if(error){
                console.log(error.response.data.message)
            }
        }
    }

  return (
    <>
         <div className="userReg-container"> 
        <main>
            <div className="userReg-title-container">
                <h1>Chess Registration Form</h1>
                <p>Last Registration Day Jan 30,2025</p>
            </div>
            <div className="form-container">
                <div className="input-name">
                    <label for="">Name</label>
                    <input type="text"
                    placeholder="NAME WITH INITITALS LAST"
                    value={playerName}
                    onChange={handleName}
                    />
                </div>
                <div className="input-fideId">
                    <label for="">FIDE ID</label>
                    <input type="text" 
                    placeholder="Enter FIDE ID"
                    value={playerFIDE_id}
                    onChange={handleFIDE}
                    />
                </div>
                <div className="aicfId">
                    <label for="">AICF ID</label>
                    <input type="text" 
                    placeholder="Enter AICF ID"
                    value={playerAICF_id}
                    onChange={handleAICF}
                    />
                </div>
                <div className="input-email">
                    <label for="">Email</label>
                    <input type="text" 
                    placeholder="Enter Email"
                    value={playerEmail}
                    onChange={handleEmail}
                    />
                </div>
                <div className="input-DOB">
                    <label for="">Date of Birth</label>
                    <input type="date" 
                    placeholder="Enter DOB"
                    value={playerDOB}
                    onChange={handleDOB}
                    />
                </div>
                <div className="input-modile">
                    <label for="">Mobile Number</label>
                    <input type="text" 
                    placeholder="Enter Mobile Number"
                    value={playerMobile}
                    onChange={handleMobile}
                    />
                </div>
                <div className="input-works">
                    <label for="">School/College/Company Name</label>
                    <input type="text" 
                    placeholder="Enter work"
                    value={playerQualification}
                    onChange={handleQualification}
                    />
                </div>
                
                </div>
                <div className="input-address">
                    <label for="">Address</label>
                    <textarea 
                    onChange={handleAddress}
                    value={playerAddress}
                    >      
                    </textarea>
                </div>
                <div className="controls">

                    {
                        type === "add" ? (<button className="register-btn"
                            onClick={handleRegister}
                            >Register</button>) : (<button onClick={handleUpdate}>Update</button>)
                    }
                    
                     <button className='userReg-close-btn' onClick={handleClose}>Close</button>
                </div>
        </main>
    </div>
    </>
  )
}

export default UserRegistration;