import { useEffect, useRef } from 'react';
import Message from './Message';
import { StyledChatBox } from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Typography } from '@mui/material';

type MessageType = {
  id: string;
  date: Date;
  message: string;
  messageId: string;
  username: string;
};

type ChatBoxPropType = {
  messages?: MessageType[];
  userId?: string;
};

export default function ChatBox(props: ChatBoxPropType) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.userSlice);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.messages]);

  return (
    <StyledChatBox ref={messagesEndRef}>
      {!props.messages?.length && (
        <Typography>
          No messages have been sent yet... Feel free to start!
        </Typography>
      )}
      {props.messages?.map((msg) => (
        <Message
          key={msg.messageId}
          timestamp={msg.date}
          sender={msg.username}
          isSender={msg.id === props.userId || user.id === msg.id}
          message={msg.message}
        />
      ))}
    </StyledChatBox>
  );
}
