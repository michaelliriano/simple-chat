import Sidebar from './Sidebar';
import { StyledChatRoom } from './style';
import Footer from './Footer';
import ChatBox from './ChatBox';
import useChat from './hooks/useChat';

export default function Chat() {
  const {
    userId,
    users,
    message,
    messages,
    setMessage,
    handleSendMessage,
    handleTyping,
    userStopTyping,
    usersTyping,
    rooms,
    currentRoom,
  } = useChat();

  return (
    <StyledChatRoom>
      <Sidebar
        users={users}
        usersTyping={usersTyping}
        rooms={rooms}
        currentRoom={currentRoom}
      />
      <ChatBox messages={messages} userId={userId} />
      <Footer
        handleStopTyping={userStopTyping}
        message={message}
        setMessage={setMessage}
        onSend={handleSendMessage}
        onTyping={handleTyping}
      />
    </StyledChatRoom>
  );
}
