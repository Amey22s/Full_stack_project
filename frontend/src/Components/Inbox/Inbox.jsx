import React, { useState, useEffect } from 'react';
import './Inbox.css'
// import Message from "../Message/Message";
import User from "../User/User";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllMessages, getMyConversations } from "../../Actions/Message";
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


  const { user, loading: userLoading } = useSelector((state) => state.user, shallowEqual);

  const { loading, error, conversations } = useSelector(
    (state) => state.myConversations, shallowEqual
  );

  const { selectedConversation, error1 } = useSelector(
    (state) => state.allMessages, shallowEqual
  )

  useEffect(() => {
    // Fetch conversations from backend API
    console.log("User is ",user)
    dispatch(getMyConversations())
    setSelectedConv(selectedConversation);
  },[dispatch]);

  useEffect(() => {
    dispatch(getAllMessages(params.id));
    setReceiver(params.id)
    setSelectedConv(selectedConversation);
    console.log("Receiver in Inbox is ",receiver);
    console.log("SelecteConversation in Inbox is ",selectedConversation);
    console.log("Conversations in Inbox is ",conversations)
  }, [dispatch, params.id]);



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



  return loading === true || userLoading === true ? (
    <Loader />
  ) : (

    <div className="inbox">
      <div className="inboxleft">
      { (
        <div>
          <h2>Conversation with {receiver}</h2>
          <ul>
            {selectedConversation && (selectedConversation.map(message => (
              <li key={message._id}>
              {message.sender +": "+message.text}
              </li>
            )))}
          </ul>
          <NewChat 
          sender = {user._id}
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
          { user.following && user.following.length > 0 ? (
            user.following.map((followee) => (
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



//     // <h1>Messages</h1>
//     <div className='inbox'>
//        (<ul>
//         {conversations.map(conversation => (
//           <li key={conversation._id} onClick={() => handleConversationClick(conversation._id)}>
//             <Avatar
//           src={conversation.avatar.url}
//           sx={{ height: "6vmax", width: "6vmax" }}
//         />{conversation.name}
//           </li>
//         ))}
//       </ul> ) : (
//           <Typography>No Conversations Yet</Typography>
//         )}
//       </div>
//       {/* <ul>
//         {conversations.map(conversation => (
//           <li key={conversation.id} onClick={() => handleConversationClick(conversation.id)}>
//             <img src={conversation.userAvatar} alt="" />
//             <span>{conversation.latestMessage}</span>
//           </li>
//         ))}
//       </ul> */}
//       {selectedConversation && (
//         <div className='inboxleft'> 
//           <h2>Conversation with {selectedConversation[0].receiver.name}</h2>
//           <ul>
//             {selectedConversation.map(message => (
//               <li key={message._id}>
//                 {/* <Avatar
//           src={message.sender.avatar.url}
//           sx={{ height: "2vmax", width: "2vmax" }}
//             /> */}
//         {message.sender +": "+message.text}
//         </li>
//             ))}
//           </ul>
//           <NewChat 
//           sender = {user._id}
//           receiver = {receiver} />
//           {/* <input placeholder="Type your message" onChange={e => handleSendMessage(e.target.value)} />
//           <button></button> */}
//         </div>
//       )}
//     </div>
//   );
// }
