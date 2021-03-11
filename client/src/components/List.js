import {
    Avatar,
    List as AntdList,
}             from "antd"
import React  from "react"
import styled from "styled-components"

const List = ({ users }) => (
    <ListWrapper>
        <ListHeading>Active Users</ListHeading>

        <AntdList
            itemLayout="horizontal"
            dataSource={users}
            renderItem={user => (
                <AntdList.Item>
                    <AntdList.Item.Meta
                        avatar={<Avatar src={`https://ui-avatars.com/api/?name=${user.username}`}/>}
                        title={<a href="/">{user.username}</a>}/>
                </AntdList.Item>
            )}/>
    </ListWrapper>
)

const ListWrapper = styled(AntdList)`
  margin-right: 10px;
  flex: 0 0 35%;
  padding: 20px;
  overflow: auto;

  .ant-list-split .ant-list-item {
    padding: 7px 0;
  }

  .ant-list-item-meta {
    align-items: center;
  }

  .ant-list-item-meta-content {
    flex-grow: 0;
  }

  h4 {
    font-size: 16px;
  }

  a {
    color: #097ef0;
  }
`

const ListHeading = styled.div`
  color: #757591;
  font-size: 20px;
  font-style: oblique;
  border-bottom: 1px solid #757591;
`

export default List
