import React, { useState } from 'react'
import "./Conversation.scss"

export default function Conversation({conversation, currentUser}) {

  return (
    <div className="conversation">
        <div>
        {
            conversation.isGroupChat ? 
            <img className='conversationImg' src={conversation.img || "/img/noavatar.jpg"} alt="" />
            : currentUser.isSeller ?
            <img className='conversationImg' src={conversation.buyer.img || "/img/noavatar.jpg"} alt="" />
            : 
            <img className='conversationImg' src={conversation.seller.img || "/img/noavatar.jpg"} alt="" />
          }
        </div>
        <div className='name'>
          {
            currentUser.isAdmin ? 
            <span><strong>{conversation.chatName}</strong> <br />Order Id : {conversation.orderId._id}</span>
            :conversation.isGroupChat ? 
            <span>{conversation.chatName}</span>
            : currentUser.isSeller ? 
            <span>{conversation.buyer.username} </span>
            : 
            <span>{conversation.seller.username}  </span>
          }
        </div>
    </div>
  )
}
