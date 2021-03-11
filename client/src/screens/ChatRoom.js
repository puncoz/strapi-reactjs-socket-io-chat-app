import {
    Button,
    Input,
}                   from "antd"
import React, {
    useEffect,
    useState,
}                   from "react"
import styled       from "styled-components"
import Header       from "../components/Header"
import List         from "../components/List"
import { Messages } from "../components/Messages"
import { history }  from "../config/network"
import { socket }   from "../config/web-sockets"

const ChatRoom = ({ username, room, joinData }) => {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (Object.keys(joinData).length) {
            setMessages([joinData])

            socket.on("message", (message, error) => {
                setMessages(prevMessages => [...prevMessages, message])
            })

            socket.on("roomInfo", ({ users }) => {
                setUsers(users)
            })
        } else {
            history.push("/join")
        }
    }, [joinData])

    const sendMessage = (message) => {
        socket.emit("sendMessage", { userId: joinData.userData.id, message }, (error) => {
            if (error) {
                console.error(error)

                history.push("/join")
            }
        })

        setMessage("")
    }

    const handleOnMessageType = (event) => {
        setMessage(event.target.value)
    }

    const handleOnMessageSend = (event) => {
        if (message) {
            sendMessage(message)
        }
    }

    return (
        <ChatContainer>
            <Header room={room}/>

            <ChatWrapper>
                <List users={users}/>

                <ChatBox>
                    <Messages
                        messages={messages}
                        username={username}/>

                    <Input
                        type="text"
                        placeholder="Type your message"
                        value={message}
                        onChange={handleOnMessageType}/>

                    <SendButton onClick={handleOnMessageSend}>
                        <SendIcon>
                            <i className="fa fa-paper-plane"/>
                        </SendIcon>
                    </SendButton>
                </ChatBox>
            </ChatWrapper>
        </ChatContainer>
    )
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f2f2f2;
  padding: 40px;
  width: 80vw;
  box-shadow: 5px 10px 18px #888;
  height: 80vh;
`

const ChatWrapper = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  border-radius: 8px;
  height: 60%;
  justify-content: space-between;
`

const ChatBox = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  background: #fff;
`

const SendButton = styled(Button)`
  height: 45px;
  background: #2979ff;
  transition: 0.5s;
`

const SendIcon = styled.div`
  color: #fff;
  font-size: 20px;

  :hover, :active {
    color: #2979ff;
    background: #fff;
  }

  :focus {
    outline: none;
  }
`

export default ChatRoom
