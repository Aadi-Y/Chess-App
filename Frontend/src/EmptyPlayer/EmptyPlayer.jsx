import NoPlayers from "../assets/NoPlayers.jpg"
import "./EmptyPlayer.css"
function EmptyPlayer(){
    return(<>
       <div className="emptyPlayer-container">
            <img src={NoPlayers} />
            <h2>No player Found</h2>
       </div>
    </>)
}

export default EmptyPlayer;