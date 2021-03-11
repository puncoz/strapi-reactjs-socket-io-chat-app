import React          from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import styled         from "styled-components"
import Message        from "./Message"

const Messages = ({ messages, username }) => (
    <StyledMessages>
        <ScrollToBottom>
            {messages.map((message, index) => (
                <div key={index}>
                    <Message message={message} username={username}/>
                </div>
            ))}
        </ScrollToBottom>
    </StyledMessages>
)

const StyledMessages = styled.div``

export default Messages
