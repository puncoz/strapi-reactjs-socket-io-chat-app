import {
    Button,
    Card,
    Input,
}                          from "antd"
import React, { useState } from "react"
import styled              from "styled-components"
import { socket }          from "../config/web-sockets"

const JoinRoom = ({ onJoinSuccess }) => {
    const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")
    const [error, setError] = useState("")

    const handleOnChange = (event, setter) => {
        const value = event.target.value

        setter(value)
    }

    const handleOnClick = () => {
        if (username && room) {
            socket.emit("join", { username, room }, (error) => {
                if (error) {
                    setError(error)
                    console.error(error)
                    return
                }

                socket.on("welcome", (data) => {
                    onJoinSuccess(data)
                })
            })
        }
    }

    return (
        <Centered>
            <StyleCard>
                <label htmlFor="username">
                    Enter your username

                    <Input name="username"
                           placeholder="Enter your username"
                           maxLength={15}
                           value={username}
                           onChange={(event) => handleOnChange(event, setUsername)}
                    />
                </label>

                <label htmlFor="room">
                    Enter room id of your choice

                    <Input name="room"
                           placeholder="Enter your room id"
                           maxLength={15}
                           value={room}
                           onChange={(event) => handleOnChange(event, setRoom)}
                    />
                </label>

                <StyledButton
                    type="primary"
                    size="large"
                    onClick={handleOnClick}>
                    Join the chat room
                </StyledButton>
            </StyleCard>
        </Centered>
    )
}

const Centered = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const StyleCard = styled(Card)`
  width: 581px;
  height: 210px;
  box-shadow: 2px 3px 3px 2.8px #d7d7e4;
  text-align: center;
`

const StyledButton = styled(Button)`
  margin-top: 10px;
`

export default JoinRoom
