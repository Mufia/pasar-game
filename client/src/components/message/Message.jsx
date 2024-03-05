import React from 'react'
import "./Message.scss"
import {format} from "timeago.js"

export default function Message({message, own}) {

  return (
    <div className={own ? "message own" : "message"}>
        {
          own ? "" : 
          <div className="name">
            <span>{message.sender.username}</span>
          </div>
        }
        <div className="messageTop">
        <img src={message.sender.img || "/img/noavatar.jpg"} alt="" />
        <pre className='text'>{message.content}</pre>
        </div>
        <div className="messageBottom">
            {format(message.createdAt)}
        </div>
    </div>
  )
}
