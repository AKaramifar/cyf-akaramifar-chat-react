import React, { Component } from "react";
import "./MainPanel.css";
import AllUsers from "./AllUsers.js";
import ChatPlace from "./ChatPlace.js";
import MyPanel from "./MyPanel.js";

class MainPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      currentUserToChat: null,
      messages: null,
      messagesBetweenCurrentUsers: null,
    };
  }
  componentDidMount() {
    this.getMessages_Func = () => {
      fetch(`https://cyf-akaramifar-chat-node.glitch.me/data`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentUserId: this.props.userInfo_Parm.userId,
          currentUserName: this.props.userInfo_Parm.userName,
          currentUserPassword: this.props.userInfo_Parm.userPassword,
          currentUserSecurityCode: this.props.userInfo_Parm.userSecurityCode,
          currentUserToChat:
            this.state.currentUserToChat !== null
              ? this.state.currentUserToChat.userId
              : null,
        }),
      })
        .then((Response) => Response.json())
        .then((data) => {
          this.setState({ users: data[0] });
          this.setState({ messages: data[1] });
          if (this.state.currentUserToChat !== null) {
            let usersId = [
              this.props.userInfo_Parm.userId,
              this.state.currentUserToChat.userId,
            ];
            this.setState({
              messagesBetweenCurrentUsers: this.state.messages.filter(
                (message) =>
                  usersId.indexOf(message.senderUserId) > -1 &&
                  usersId.indexOf(message.receiverUserId) > -1
              ),
            });
          }
          setTimeout(() => this.getMessages_Func(), 2000);
        })
        .catch((err) => console.log(err));
    };
    this.setCurrentUserToChat_Func = (user) => {
      this.setState({ currentUserToChat: user });
      let usersId = [this.props.userInfo_Parm.userId, user.userId];
      this.setState({
        messagesBetweenCurrentUsers: this.state.messages.filter(
          (message) =>
            usersId.indexOf(message.senderUserId) > -1 &&
            usersId.indexOf(message.receiverUserId) > -1
        ),
      });
    };
    this.getMessages_Func();
  }

  render() {
    return (
      <div className="MainPanel_Div_MainBody_CN">
        {this.state.users !== null ? (
          <AllUsers
            setCurrentUserToChat_Func_Parm={this.setCurrentUserToChat_Func}
            users_Parm={this.state.users}
            userInfo_Parm={this.props.userInfo_Parm}
            setMessages_Func_Parm={this.setMessages_Func}
          />
        ) : null}
        {this.state.currentUserToChat !== null ? (
          <ChatPlace
            currentUserToChat_Parm={this.state.currentUserToChat}
            userInfo_Parm={this.props.userInfo_Parm}
            messages_Parm={this.state.messagesBetweenCurrentUsers}
          />
        ) : null}
        {this.state.users !== null ? <MyPanel /> : null}
      </div>
    );
  }
}
export default MainPanel;
