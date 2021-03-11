import React, {
    useEffect,
    useState,
}                  from "react"
import { history } from "../../config/network"
import { socket }  from "../../config/web-sockets"
import Header      from "./Header"
import Messages    from "./Messages"
import {
    ChatBox,
    ChatContainer,
    StyledContainer,
}                  from "./Styles"

const ChatRoom = ({ username, room, joinData }) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (Object.keys(joinData).length) {
            setMessages([joinData])

            socket.on("message", (message, error) => {
                setMessages(prevMessages => [...prevMessages, message])
            })
        } else {
            history.push("/join")
        }
    }, [joinData])

    return (
        <ChatContainer>
            <Header room={room}/>

            <StyledContainer>
                <ChatBox>
                    <Messages
                        messages={messages}
                        username={username}/>
                </ChatBox>
            </StyledContainer>
        </ChatContainer>
    )
}

export default ChatRoom
