import './MessageList.css'
function MessageList({ conversations, handleConversationClick }) {
    return (
      <ul>
        {conversations.map(conversation => (
          <li key={conversation.id} onClick={() => handleConversationClick(conversation.id)}>
            <img src={conversation.userAvatar} alt="" />
            <span>{conversation.latestMessage}</span>
          </li>
        ))}
      </ul>
    );
  }
  
  export default MessageList;
  