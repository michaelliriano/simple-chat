import React, { useContext, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { SocketContext } from '../../context/socket';
import { useNavigate } from 'react-router-dom';
import { SignUpWrapper, FormWrapper } from './styles';
import { useDispatch } from 'react-redux';

import { setUser, setRoom } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export default function Signup() {
  const user = useSelector((state: RootState) => state.userSlice);
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState(user.username || '');
  const [roomId, setRoomId] = useState('');
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(setUser({ id: socket.id, username }));
    dispatch(setRoom(roomId));
    navigate('/joined');
  };

  return (
    <SignUpWrapper>
      <FormWrapper
        onSubmit={(e) => handleSignup(e)}
        style={{ display: 'flex', flexDirection: 'column', width: 300 }}
      >
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          variant="standard"
          defaultValue={user.username}
          disabled={!!user.username?.length}
          required
        />
        <TextField
          onChange={(e) => setRoomId(e.target.value)}
          label="Room ID"
          variant="standard"
          required
        />
        <Button type="submit" variant="contained">
          Join
        </Button>
      </FormWrapper>
    </SignUpWrapper>
  );
}
