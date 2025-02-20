import Landing from "./Landing/Landing";
import About from "./About/About";
import Filter from "./Filter/Filter";
// import OrgRegistration from "./OrgRegistration/OrgRegistration";
// import UserRegistration from "./UserRegistration/UserRegistration";
import EventInfo from "./EventInfo/EventInfo";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import Modal from "react-modal";
import PlayerInfo from "./PlayerInfo/PlayerInfo";
// import EmptyEvent from "./EmptyEvent/EmptyEvent";
// import EmptyPlayer from "./EmptyPlayer/EmptyPlayer";
import EventPermission from "./EventPermission/EventPermission"
// import Practice from "./Practice/Practice";
import PlayerPermission from "./PlayerPermission/PlayerPermission";

Modal.setAppElement('#root'); 

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

function App({handleView}) {

  return (
    <>
       <Router>
        <Routes>
          <Route path="/" element={<Landing/>}></Route>
          <Route path="/about" element={<About eventItem={handleView}/>}></Route>
          <Route path="/filter" element={<Filter/>}></Route>
          {/* <Route path="/orgRegistration" element={<OrgRegistration/>}></Route> */}
          {/* <Route path="/userRegistration" element={<UserRegistration/>}></Route> */}
          <Route path="/eventInfo" element={<EventInfo/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/eventInfo" element={<EventInfo/>}></Route>
          <Route path="/playerInfo" element={<PlayerInfo/>}></Route>
          {/* <Route path="/emptyEvent" element={<EmptyEvent/>}></Route> */}
          {/* <Route path="/emptyPlayer" element={<EmptyPlayer/>}></Route> */}
          {/* <Route path="/practice" element={<Practice/>}></Route> */}
          <Route path="/eventPermission" element={<EventPermission/>}></Route>
          <Route path="/playerPermission" element={<PlayerPermission/>}></Route>
        </Routes>
       </Router>
    </>
  )
}

export default App
