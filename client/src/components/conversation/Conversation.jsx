import React, { useState } from 'react'
import "./Conversation.scss"

export default function Conversation({conversation, currentUser}) {


  return (
    <div className='conversation'>
        <img className='conversationImg' src={conversation.orderId.img || "/img/noavatar.jpg"} alt="" />
        <span className="conversationName">{conversation.chatName}</span>
    </div>
  )
}
