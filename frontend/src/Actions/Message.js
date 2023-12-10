import axios from "axios";


export const createNewChat = (message, sender, receiver) => async (dispatch) => {
  try {
    dispatch({
      type: "newChatRequest",
    });

    const { data } = await axios.post(
      `/api/v1/message/send`,
      {
        message,
        sender,
        receiver
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "newChatSuccess",
      payload: data.messages,
    });
  } catch (error) {
    dispatch({
      type: "newChatFailure",
      payload: error.response.data.message,
    });
  }
};

export const getMyConversations = () =>
  async (dispatch) => {
    try {
      dispatch({
        type: "myConversationsRequest",
      });

      const { data } = await axios.get(`/api/v1/my/conversations`);

      console.log("Data output in getMyConversations is ",data);
      dispatch({
        type: "myConversationsSuccess",
        payload: data.conversations,
      });
    } catch (error) {
      dispatch({
        type: "myConversationsFailure",
        payload: error.response.data.message,
      });
    }
  };


  export const getAllMessages = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "allMessagesRequest",
      });
  
      const { data } = await axios.get(`/api/v1/conversations/${id}`);

      console.log("Data output in getAllMessages is ",data);
      dispatch({
        type: "allMessagesSuccess",
        payload: data.messages,
      });
    } catch (error) {
      dispatch({
        type: "allMessagesFailure",
        payload: error.response.data.message,
      });
    }
  };