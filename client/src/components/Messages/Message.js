import React, {
    useEffect,
    useState,
}             from "react"
import styled from "styled-components"

const Message = ({ username, message: { user, text } }) => {
    const [messageByCurrentUser, setMessageByCurrentUser] = useState(false)
    const [isBotMessage, setIsBotMessage] = useState(false)

    useEffect(() => {
        const trimmedName = username.trim().toLowerCase()

        if (user === trimmedName) {
            setMessageByCurrentUser(true)
        } else if (user === "bot") {
            setIsBotMessage(true)
        }
    }, [user, username])

    const background = messageByCurrentUser ? "blue" : "dark"
    const textPosition = messageByCurrentUser ? "flex-end" : "flex-start"
    const textColor = messageByCurrentUser ? "white" : "dark"

    return (
        <MessageContainer textPosition={textPosition}>
            <MessageBox isBot={isBotMessage} background={background}>
                <MessageText isBot={isBotMessage} color={textColor}>
                    {text}
                </MessageText>
            </MessageBox>

            {!isBotMessage && <SentBy>{user}</SentBy>}
        </MessageContainer>
    )
}

const MessageContainer = styled.div`
  display: flex;
  padding: 0 5%;
  margin-top: 3px;
  justify-content: ${props => props.textPosition};
`

const MessageBox = styled.div`
  border-radius: 20px;
  padding: ${props => props.isBot ? '0 20px' : '15px 20px'};
  display: inline-block;
  max-width: 80%;
  background: ${props => props.isBot ? 'transparent' : (props.background === "blue" ? "#2979ff" : "#f3f3f3")};
`

const MessageText = styled.p`
  font-size: 1.1em;
  word-wrap: break-word;
  color: ${props => props.isBot ? '#7b7b7b' : (props.color === "white" ? "#fff" : "#353535")};
  margin: 0;
`

const SentBy = styled.p`
  display: flex;
  align-items: center;
  font-family: Helvetica, serif;
  color: #828282;
  letter-spacing: 0.3px;
  padding: 0 0 0 10px;
  margin: 0;
`

export default Message
