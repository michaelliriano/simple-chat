import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { SocketContext } from '../../../context/socket';
import { setError } from '../../../features/user/userSlice';

/*
    Custom Hook to handle Chat Interactions
*/
export default function useChat() {
  const socket = useContext(SocketContext);
  const user = useSelector((state: RootState) => state.userSlice);
  const userId = socket.id;
  const rooms = user.rooms;
  const currentRoom = user.room || '';
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [usersTyping, setUsersTyping] = useState<string[]>([]);
  let navigate = useNavigate();

  const handleSendMessage = useCallback(
    (msg: string) => {
      socket.emit('send message', {
        id: user.id,
        message: msg,
        date: new Date(),
        room: user.room,
        username: user.username,
      });
      setMessage('');
    },
    [socket, user.id, user.room, user.username],
  );
  const handleTyping = useCallback(() => {
    socket.emit('user typing', {
      id: user.id,
      username: user.username,
    });
  }, [socket, user.id, user.username]);

  const userStopTyping = useCallback(() => {
    socket.emit('user stop typing', {
      id: user.id,
      username: user.username,
    });
  }, [socket, user.id, user.username]);

  useEffect(() => {
    socket.emit('join room', { ...user });
  }, [socket, user]);

  useEffect(() => {
    socket.on('user joined', ({ messages, users }) => {
      setMessages(messages);
      setUsers(users);
    });
  }, [socket]);
  useEffect(() => {
    socket.on('error', (error: any) => {
      dispatch(setError(error.message));
      navigate('/');
    });
  }, [dispatch, navigate, socket]);
  useEffect(() => {
    socket.on('users typing', (usernames) => {
      setUsersTyping(usernames);
    });
  }, [socket]);
  useEffect(() => {
    socket.on('on message', (msg) => setMessages(msg));
  }, [socket]);

  useEffect(() => {
    socket.on('user left', (data) => {
      setUsers(data.users);
    });
  }, [socket]);
  return {
    users,
    messages,
    message,
    usersTyping,
    userId,
    rooms,
    currentRoom,
    handleSendMessage,
    handleTyping,
    userStopTyping,
    setMessage,
  };
}
