import React, { useState, useEffect } from 'react';
import './Inbox.css'
// import Message from "../Message/Message";
import User from "../User/User";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllMessages, getMyConversations } from "../../Actions/Message";
import { getUserProfile } from "../../Actions/User";
import Loader from "../Loader/Loader";
import NewChat from '../NewChat/NewChat';
import { Avatar, Typography } from "@mui/material";
import { useAlert } from "react-alert";

function Inbox() {
  const [receiver, setReceiver] = useState("");
  const [selectedConv, setSelectedConv] = useState([]);

  // const sender = {};
  // var receiver = "";

  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const {user} = useSelector((state) => state.userProfile);

  const { user:me, loading: meLoading } = useSelector((state) => state.user, shallowEqual);

  const { loading, error, conversations } = useSelector(
    (state) => state.myConversations, shallowEqual
  );

  const { selectedConversation, error1 } = useSelector(
    (state) => state.allMessages, shallowEqual
  )

  useEffect(() => {
    // Fetch conversations from backend API
    console.log("User is ",me)
    dispatch(getMyConversations())
    setSelectedConv(selectedConversation);
  },[dispatch]);

  useEffect(() => {
    dispatch(getAllMessages(params.id));
    dispatch(getUserProfile(params.id));
    setReceiver(params.id)
    setSelectedConv(selectedConversation);
    console.log("Receiver in Inbox is ",user);
    console.log("SelecteConversation in Inbox is ",selectedConversation);
    console.log("Conversations in Inbox is ",conversations)
  }, [dispatch, params.id,selectedConversation]);



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



  return loading === true || meLoading === true ? (
    <Loader />
  ) : (

    <div className="inbox">
      <div className="inboxleft">
      { (
        <div>
          <h2>{user === undefined ? 'Start a new conversation' : `Conversation with ${user.name}`}</h2>
          <ul>
            {selectedConversation && (selectedConversation.map(message => (
              <li key={message._id}>
              {(message.sender === user._id ? user.name : me.name)+": "+message.text}
              </li>
            )))}
          </ul>
          <NewChat 
          sender = {me._id}
          receiver = {receiver} />
          </div>
      )
      }
      </div>
      <div className="inboxright">
        { conversations && conversations.length > 0 ? (
          conversations.map((receiver) => (
            <User
              key={receiver._id}
              source={"from inbox"}
              userId={receiver._id}
              name={receiver.name}
              avatar={receiver.avatar.url}
            />
          ))
        ) : (<div></div>)
          }
          <div>
          <Typography>Start a Conversation</Typography>
          { me.following && me.following.length > 0 ? (
            me.following.map((followee) => (
              <User
                key={followee._id}
                source={"from inbox"}
                userId={followee._id}
                name={followee.name}
                avatar={followee.avatar.url}
              />
              
            ))
          ) : (<Typography> No Followers Yet.</Typography>)
          }
          </div>

      </div>
    </div>
  )
      }
  export default Inbox;