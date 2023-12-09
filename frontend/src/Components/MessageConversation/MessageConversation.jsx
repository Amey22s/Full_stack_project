import './MessageConversation.css'
function MessageConversation({ conversation, handleSendMessage }) {
    return (
      <div>
        <h2>Conversation with {conversation.userName}</h2>
        <ul>
          {conversation.messages.map(message => (
            <li key={message.id}>{message.text}</li>
          ))}
        </ul>
        <input placeholder="Type your message" onChange={e => handleSendMessage(e.target.value)} />
      </div>
    );
  }
  
  export default MessageConversation;
  