const User = require("../models/User");
const Message = require("../models/Message");
const crypto = require("crypto");


exports.sendMessage = async (req, res) => {
  try {

    console.log("Message is ",req.body.message," sender is ",req.body.sender," receiver is ",req.body.receiver);

    const sender = await User.findById(req.body.sender.sender);
    const receiver = await User.findById(req.body.sender.receiver);


    console.log("Message receiver is ",JSON.stringify(receiver))
    console.log("Message sender is ",JSON.stringify(sender))

    const newMessage = {
      sender: sender,
      receiver: receiver,
      text: req.body.message,
    };

    console.log(newMessage);

    const message = await Message.create(newMessage);

    console.log("Message created")
    sender.messages.unshift(message._id);
    receiver.messages.unshift(message._id);


    console.log("Message added in both chats")

    await sender.save();
    await receiver.save();

    console.log("Message saved in both chats")
    res.status(201).json({
      success: true,
      message: "Post created",
      payload: sender.messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getMyConversations = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      // console.log("User is ",user)

      // console.log("User is ",JSON.stringify(user))
  
      const conversations = [];
  
      for (let i = 0; i < user.conversations.length; i++) {
        const conversation = await User.findById(user.conversations[i]).populate(
        );
        conversations.push(conversation);
      }


    console.log("Conversations in getMyConversations bakend is ",conversations);
  
      res.status(200).json({
        success: true,
        conversations: conversations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  exports.getMyMessages = async (req, res) => {
    try {
      const receiverUser = await User.findById(req.params.id);
      const senderUser = await User.findById(req.user._id);

      const rUserId = JSON.stringify(receiverUser._id);

      console.log("Sender is ",senderUser._id)
      console.log("Receiver is ",rUserId)
  
      const messages = [];
  
      for (let i = 0; i < senderUser.messages.length; i++) {
        const message = await Message.findById(senderUser.messages[i]).populate(
        );


        // console.log("Message receiver is ",message.receiver._id)
        // console.log("Message sender is ",message.sender._id)
        // console.log("Sender name is ",message.sender.name)
        // console.log("Message object is ",JSON.stringify(message));
        if(JSON.stringify(message.receiver._id) === rUserId || JSON.stringify(message.sender._id) === rUserId)
        {
            messages.push(message);
        }
      }

      // console.log("Messages in getMyMessages bakend is ",messages);
  
      res.status(200).json({
        success: true,
        messages: messages,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };