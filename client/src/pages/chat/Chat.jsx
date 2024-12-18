import React from 'react'
import "./Chat.scss"
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest';
import { useContext, useEffect, useRef, useState } from "react";
import {io} from "socket.io-client"


const Chat = () => {
  
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  /*useEffect (() => {
    setSocket(io("ws://localhost:8900"))
  },[])*/


  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await newRequest.get("/chat");
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [currentUser._id]);


  useEffect (() => {
    const getMessages = async () => {
      try {
        const res = await newRequest.get("/messages/" + currentChat._id)
        setMessages (res.data)
      } catch (err) {
        console.log(err)
      }
    };
    getMessages();
  }, [newMessage, currentChat])

  if (currentUser.isAdmin) {
    console.log(conversations)
    console.log(currentChat)
    console.log(messages)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender : currentUser._id,
      content : newMessage,
      chatId : currentChat._id,
    }
    try {
      const res = await newRequest.post ("/messages" , message)
      setMessages([...messages, res.data])
      setNewMessage("")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <div className='chat'>
      <div className="container">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <h1>Chat</h1>
            {
              conversations.map( c=> (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={currentUser} key={c._id}/>
                </div>
              ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentChat ? ( 
              <>
              <div className="top" >
                {messages.map ((m) => (
                  <div ref={scrollRef}>
                  <Message message={m}  own = {m.sender._id === currentUser._id} key={m.chatId} currentUser={currentUser}/>
                  </div>
                ))}
              </div>

            <div className="bottom">
              <textarea className='input' 
              placeholder='Tulis Pesan .....' 
              onChange={(e) => setNewMessage (e.target.value)}
              value={newMessage}
              >
              </textarea>
              <button className='submit' onClick={handleSubmit} >
                Kirim
              </button>
            </div>
            </> 
            ):(
              <span>    </span>
            ) 
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat;