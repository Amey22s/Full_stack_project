import React, { useState, useEffect } from 'react';
import './Inbox.css'
// import Message from "../Message/Message";
// import User from "../User/User";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getAllMessages, getMyConversations } from "../../Actions/Message";
import Loader from "../Loader/Loader";
import NewChat from '../NewChat/NewChat';
import { Avatar, Typography } from "@mui/material";
import { useAlert } from "react-alert";
// import { get } from 'mongoose';


function Inbox() {
  const [receiver, setReceiver] = useState("");
  // const [selectedConversation, setSelectedConversation] = useState([]);

  // const sender = {};
  // var receiver = "";

  const dispatch = useDispatch();
  const alert = useAlert();


  const { user, loading: userLoading } = useSelector((state) => state.user, shallowEqual);

  const { loading, error, conversations } = useSelector(
    (state) => state.myConversations, shallowEqual
  );

  const { selectedConversation, error1 } = useSelector(
    (state) => state.allMessages, shallowEqual
  )

  useEffect(() => {
    // Fetch conversations from backend API
    dispatch(getMyConversations())
    console.log("Conversations in Inbox is ",conversations)
  }, [dispatch]);



  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    else if(error1) {
      alert.error(error1);
      dispatch({type: "clearErrors"});
    }

  },[alert, error, error1, dispatch]);

  const handleConversationClick = async(receiverId) => {
    // Load selected conversation and messages

    dispatch(getAllMessages(receiverId));
    setReceiver(receiverId)
    console.log("Receiver in Inbox is ",receiver);
    console.log("SelecteConversation in Inbox is ",selectedConversation);
  };

  const handleSendMessage = (message) => {
    // Send message to backend API
    fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        message,
        to: selectedConversation.userId,
      }),
    })
      .then(() => {
        // Update conversation and message list
      });
  };

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    // <h1>Messages</h1>
    <div className='inbox'>
      <div className="inboxright">
        {conversations && conversations.length > 0 ? (<ul>
        {conversations.map(conversation => (
          <li key={conversation._id} onClick={() => handleConversationClick(conversation._id)}>
            <Avatar
          src={conversation.avatar.url}
          sx={{ height: "6vmax", width: "6vmax" }}
        />{conversation.name}
          </li>
        ))}
      </ul> ) : (
          <Typography>No Conversations Yet</Typography>
        )}
      </div>
      {/* <ul>
        {conversations.map(conversation => (
          <li key={conversation.id} onClick={() => handleConversationClick(conversation.id)}>
            <img src={conversation.userAvatar} alt="" />
            <span>{conversation.latestMessage}</span>
          </li>
        ))}
      </ul> */}
      {selectedConversation && (
        <div className='inboxleft'> 
          <h2>Conversation with {selectedConversation[0].receiver.name}</h2>
          <ul>
            {selectedConversation.map(message => (
              <li key={message._id}>
                {/* <Avatar
          src={message.sender.avatar.url}
          sx={{ height: "2vmax", width: "2vmax" }}
            /> */}
        {message.sender +": "+message.text}
        </li>
            ))}
          </ul>
          <NewChat 
          sender = {user._id}
          receiver = {receiver} />
          {/* <input placeholder="Type your message" onChange={e => handleSendMessage(e.target.value)} />
          <button></button> */}
        </div>
      )}
    </div>
  );
}

export default Inbox;
