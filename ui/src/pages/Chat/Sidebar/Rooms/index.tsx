import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Button, Typography } from '@mui/material';
import { useCallback, useContext, useRef, useState } from 'react';
import { setRoom } from '../../../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../../../context/socket';
import { RootState } from '../../../../app/store';
import AddIcon from '@mui/icons-material/Add';
import CustomModal from '../../../../components/common/Modal';
import { StyledInput } from './style';

type RoomsPropType = {
  rooms: string[];
  currentRoom: String;
};

export default function Rooms(props: RoomsPropType) {
  let dispatch = useDispatch();
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [newRoom, setNewRoom] = useState('');
  const user = useSelector((state: RootState) => state.userSlice);
  const socket = useContext(SocketContext);

  const input = useRef<HTMLInputElement | null>(null);

  const changeRoom = useCallback(
    (room: string) => {
      dispatch(setRoom(room));
      socket.emit('leave', { ...user });
    },
    [dispatch, socket, user],
  );

  const handleAddRoom = () => {
    if (!newRoom.length) return;
    dispatch(setRoom(newRoom));
    setShowAddRoomModal(false);
    socket.emit('leave', { ...user });
  };

  const handleShowModal = useCallback(() => {
    setShowAddRoomModal(true);
    input.current?.querySelector('input')?.focus();
  }, [input]);

  return (
    <>
      <CustomModal
        open={showAddRoomModal}
        onSuccess={handleAddRoom}
        onCancel={() => setShowAddRoomModal(false)}
        btnLabel="Go"
      >
        <Typography variant="h6" sx={{ color: '#000' }}>
          Join
        </Typography>
        <StyledInput
          ref={input}
          required
          placeholder="Enter room name"
          onChange={(e) => setNewRoom(e.target.value)}
        />
      </CustomModal>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
        }}
      >
        <Typography variant="h6">Rooms ({props.rooms.length})</Typography>
        <Button onClick={() => handleShowModal()}>
          <AddIcon />
        </Button>
      </Box>
      <Box
        sx={{
          width: '100%',
          maxWidth: 360,
          maxHeight: 150,
          overflowY: 'scroll',
        }}
      >
        <List component="nav" aria-label="chat rooms">
          {props.rooms.map((room) => (
            <ListItemButton
              style={{ margin: 0, paddingTop: 0, paddingBottom: 0 }}
              key={room}
              selected={room === props.currentRoom}
              onClick={() => changeRoom(room)}
            >
              <ListItemText primary={room} />
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Divider sx={{ mt: 1, mb: 1 }} />
    </>
  );
}
