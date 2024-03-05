import React from 'react';
import "./Admin.scss";
import PostTable from '../../components/postTable/PostTable';
import GameTable from '../../components/gameTable/GameTable';



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
                <PostTable/>
                <GameTable/>        
            </div>
        </div>
        </>
        )}

    </div>
  )
}

export default Admin;