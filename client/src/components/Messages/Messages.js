import React          from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import styled         from "styled-components"
import Message        from "./Message"

const Messages = ({ messages, username }) => (
    <MessagesWrapper>
        <ScrollToBottom>
            {messages.map((message, index) => (
                <div key={index}>
                    <Message message={message} username={username}/>
                </div>
            ))}
        </ScrollToBottom>
    </MessagesWrapper>
)

const MessagesWrapper = styled.div`
  padding: 5% 0;
  overflow: auto;
  flex: auto;
`

export default Messages
