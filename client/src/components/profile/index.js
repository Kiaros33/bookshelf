import React from 'react';

const User = (props) => {
    let user = props.users.login;
    return (
        <div className="user_container">
            <div className="avatar">
                <img src="/images/avatar.png" alt="avatar"/>
            </div>
            <div className="nfo">
                <div><span>Name: </span>{user.name}</div>
                <div><span>Lastname: </span>{user.lastname}</div>
                <div><span>E-mail: </span>{user.email}</div>
            </div>
        </div>
    );
};

export default User;
