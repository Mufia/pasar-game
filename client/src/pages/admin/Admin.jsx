import React from 'react';
import "./Admin.scss";
import UserTable from '../../components/userTable/UserTable';
import PostTable from '../../components/postTable/PostTable';



const Admin = () => {


const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const admin = currentUser?.isAdmin
    
  return (
    <div className='admin'>
        {currentUser?.isAdmin && (
            <>
            <div className="container">
            <div className="left">
                <h2>Admin Dashboard</h2>
                <div className="list">
                    <ul >
                        <li>User</li>
                        <li>Post</li>
                        <li>Order</li>
                        <li>Message</li>
                        <li>Game</li>
                    </ul>
                </div>
            </div>
            <div className="right">
                <UserTable/>
                <PostTable/>
            </div>
        </div>
        </>
        )}
    </div>
  )
}

export default Admin;