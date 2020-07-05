import React from "react";
import "./AllUsers.css";

const AllUsers = ({ users_Parm, userInfo_Parm }) => {
  return (
    <div className="AllUsers_Div_AllUsers_CN">
      <div className="AllUsers_Div_SearchUser_CN">
        <i className="AllUsers_I_SearchIcon_CN fas fa-search"></i>
        <input
          className="AllUsers_Input_SearchUser_CN"
          placeholder="Search People"
          spellCheck="false"
          autoComplete="off"
        ></input>
      </div>
      <div className="Alluser_Div_SearchResult_CN">
        {users_Parm
          .filter((user) => user.userName !== userInfo_Parm.userName)
          .map((user, index) => {
            return (
              <div className="AllUsers_Div_User_CN" key={`User_${index}`}>
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
  );
};

export default AllUsers;
