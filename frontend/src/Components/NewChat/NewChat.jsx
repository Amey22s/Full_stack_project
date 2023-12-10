import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat } from "../../Actions/Message";
// import { loadUser } from "../../Actions/User";
import "./NewChat.css";
const NewChat = (sender, receiver) => {
  const [message, setMessage] = useState("");

  const { loading, error, message1 } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const alert = useAlert();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("In New Chat Message is ",message," sender is ",sender," receiver is ",receiver);
    await dispatch(createNewChat(message, sender, receiver));
    // dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message1) {
      alert.success(message1);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message1, alert]);

  return (
    <div className="newChat">
      <form className="newChatForm" onSubmit={submitHandler}>
        {/* <Typography variant="h3">New Chat</Typography> */}

        <input
          type="text"
          placeholder="New message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};

export default NewChat;
