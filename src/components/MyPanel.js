import React from "react";
import "./MyPanel.css";

const MyPanel = ({
  setCurrentUserToChat_Func_Parm,
  usersMessageSender_Parm,
  unreadUsersMessageSender_Parm,
}) => {
  return (
    <div className="MyPannel_Div_MyPanel_CN">
      <div className="MyPanel_Div_UnreadMessages_CN">
        <p className="MyPanel_P_UnreadMessages_CN">Unread Chats</p>
        <div className="MyPanel_Div_UnreadMessagesChild_CN">
          {unreadUsersMessageSender_Parm.map((user, index) => {
            return (
              <div
                className="AllUsers_Div_User_CN"
                onClick={() => {
                  setCurrentUserToChat_Func_Parm(user);
                }}
                key={`User_${index}`}
              >
                <i
                  className={
                    user.online === "true"
                      ? "AllUsers_I_OnlineUserIcon_CN fas fa-user-circle"
                      : "AllUsers_I_UserIcon_CN fas fa-user-circle"
                  }
                ></i>
                <div>
                  <p className="AllUsers_P_UserName_CN">{user.userName}</p>
                  <p className="AllUsers_P_LastOnlineTime_CN">
                    Last Seen: {user.lastOnlineTime}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="MyPanel_Div_AllMessages_CN">
        <p className="MyPanel_P_UnreadMessages_CN">All Chats</p>
        <div className="MyPanel_Div_AllMessagesChild_CN">
          {usersMessageSender_Parm.map((user, index) => {
            return (
              <div
                className="AllUsers_Div_User_CN"
                onClick={() => {
                  setCurrentUserToChat_Func_Parm(user);
                }}
                key={`User_${index}`}
              >
                <i
                  className={
                    user.online === "true"
                      ? "AllUsers_I_OnlineUserIcon_CN fas fa-user-circle"
                      : "AllUsers_I_UserIcon_CN fas fa-user-circle"
                  }
                ></i>
                <div>
                  <p className="AllUsers_P_UserName_CN">{user.userName}</p>
                  <p className="AllUsers_P_LastOnlineTime_CN">
                    Last Seen: {user.lastOnlineTime}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyPanel;
