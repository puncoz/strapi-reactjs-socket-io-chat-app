import React  from "react"
import styled from "styled-components"

const Header = ({ room }) => (
    <HeaderWrapper>
        <OnlineStatusContainer>
            <OnlineIcon>
                <i className="fa fa-circle" aria-hidden="true"/>
            </OnlineIcon>

            <div>{room}</div>
        </OnlineStatusContainer>

        <CloseIconContainer>
            <a href="/">
                <CloseIcon>
                    <i className="fa fa-times-circle" aria-hidden="true"/>
                </CloseIcon>
            </a>
        </CloseIconContainer>
    </HeaderWrapper>
)

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2979ff;
  border-radius: 4px 4px 0 0;
  height: 60px;
  width: 100%;
`

const OnlineStatusContainer = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  margin-left: 5%;
  color: #fff;
`

const OnlineIcon = styled.div`
  color: #11ec11;
  margin-right: 10px;
`

const CloseIconContainer = styled.div`
  margin-right: 5%;
`

const CloseIcon = styled.div`
  font-size: 20px;
  color: #fff;
`

export default Header
