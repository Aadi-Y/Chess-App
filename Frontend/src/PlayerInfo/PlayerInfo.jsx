import React, { useEffect } from 'react'
import UserRegistration from '../UserRegistration/UserRegistration'
import "./PlayerInfo.css"
import Modal from "react-modal";
import {useState} from "react"
import axiosInstance from '../../utils/axiosInstance';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import EmptyPlayer from '../EmptyPlayer/EmptyPlayer';
import { useNavigate } from 'react-router-dom';

function PlayerInfo() {

    const [openModal,setOpenModal] = useState({
        isShown:false,
        data:null,
        type:'add'
    })

    const [player,setPlayer] = useState([]);
   
    const navigate = useNavigate();

    const componentStyle = {
        content: {
          width: "36rem",
          height: "36rem",
          overflowY: "auto",
          padding:"1rem",
          margin: "auto", 
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
        },
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.4)", 
          zIndex: 1000, 
        },
      };

    function handleOpen(){
        setOpenModal({
            isShown:true,
            data:null,
            type:"add"
        })
    }

    function handleClose(){
        setOpenModal({
            isShown:false,
            data:null,
            type:"close"
        })
    }

    function handleLogout(){
        localStorage.removeItem("token");
        navigate("/playerPermission");
    }

    async function handleGettingPlayer(){
        try{
            const response = await axiosInstance.get("/get-all-players");

            if(response.data){
                setPlayer(response.data.players);
            }
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        handleGettingPlayer()
    },[])

    async function handleEdit(player){
        setOpenModal({
            isShown:true,
            data:player,
            type:"update"
        })
    }

    async function handleDelete(player){
        const playerId = player._id;
        try{
            const response = await axiosInstance.delete("/delete-player/" + playerId)
            if(response){
                alert(response.data.message);
                handleGettingPlayer();
            }
        }catch(error){
            console.log(error);
        }
    }
  return (
    <>
    <div className="playerInfo-header">
        <h2>Player Card</h2>
        <button onClick={handleLogout}>logout</button>
    </div>
    <div className="modal-container">
        <Modal isOpen={
            openModal.isShown}
            onRequestClose={()=>{}}
            style={componentStyle}
            className="custom-modal-content"
        >
            <UserRegistration handleClose={handleClose} handleGettingPlayer={handleGettingPlayer} playerData={openModal.data} type={openModal.type}/>
        </Modal>
    </div>
    {

    }
    <div className='playerInfo-container-one'>

        {
            player?.length === 0 ? (<EmptyPlayer/>) : (
                <div className='playerInfo-container-two'>
            {
                player.map((playerDetail,index)=>(
                <div className="playerInfo-details" key={index}>
                    <div className="title-name">
                        <h2>Player Information</h2>
                    </div>

                    <div className="playerName">
                        <h3>Player Name</h3>
                        <p>{playerDetail?.playerName}</p>
                    </div>

                    <div className="playerFide-id">
                        <h3>Player FIDE</h3>
                        <p>{playerDetail?.playerFIDE_id}</p>
                    </div>

                    <div className="playerAicf-id">
                        <h3>Player AICF</h3>
                        <p>{playerDetail?.playerAICF_id}</p>
                    </div>

                    <div className="playerEmail">
                        <h3>Player Email</h3>
                        <p>{playerDetail?.playerEmail}</p>
                    </div>

                    <div className="playerDOB">
                        <h3>Player DOB</h3>
                        <p>{playerDetail?.playerDOB}</p>
                    </div>

                    <div className="playerMobile">
                        <h3>Player Mobile</h3>
                        <p>{playerDetail?.playerMobile}</p>
                    </div>

                    <div className="playerQualification">
                        <h3>Player Qualification</h3>
                        <p>{playerDetail?.playerQualification}</p>
                    </div>

                    <div className="playerAddress">
                        <h3>Player Address</h3>
                        <p>{playerDetail?.playerAddress}</p>
                    </div>

                    <div className="controls">
                        <button onClick={()=>handleEdit(playerDetail)}>Edit</button>
                        <button onClick={()=>handleDelete(playerDetail)}>Delete</button>
                    </div>
                </div>
                ))
            }
        </div>
            )
        }
        <div className="playerInfo-controls">
            <button className='add-btn' onClick={handleOpen}>Add</button>
        </div>
    </div>
    </>
  )
}

export default PlayerInfo