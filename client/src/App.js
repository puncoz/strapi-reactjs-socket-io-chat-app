import { useState }        from "react"
import {
    Redirect,
    Route,
    Switch,
}                          from "react-router-dom"
import { history }         from "./config/network"
import ChatRoom            from "./screens/ChatRoom"
import JoinRoom            from "./screens/JoinRoom"
import { CenteredWrapper } from "./Styles"

function App() {
    const [joinData, setJoinData] = useState({})
    const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")

    const onJoinSuccess = (data) => {
        setJoinData(data)
        setUsername(data.userData.username)
        setRoom(data.userData.room)

        history.push(`/chat/rooms/${data.userData.room}`)
    }

    return (
        <div className="App">
            <CenteredWrapper>
                <Switch>
                    <Redirect from="/" to="/join" exact/>

                    <Route
                        path="/join"
                        component={() => <JoinRoom onJoinSuccess={onJoinSuccess}/>}/>

                    <Route
                        path="/chat/rooms/:roomNumber"
                        component={() => (
                            <ChatRoom
                                username={username}
                                room={room}
                                joinData={joinData}/>
                        )}/>
                </Switch>
            </CenteredWrapper>
        </div>
    )
}

export default App
