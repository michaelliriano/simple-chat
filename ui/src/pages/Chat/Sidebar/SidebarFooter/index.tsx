import { Button, Typography } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../../app/store';
import CustomModal from '../../../../components/common/Modal';
import { SocketContext } from '../../../../context/socket';
import { removeRoom, reset } from '../../../../features/user/userSlice';
import { StyledSidebarFooter } from './style';

export default function SidebarFooter() {
  const [showConfirm, setShowConfirm] = useState(false);
  let dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const user = useSelector((state: RootState) => state.userSlice);

  const leave = useCallback(() => {
    setShowConfirm(false);
    dispatch(reset());
    socket.emit('leave', { ...user });
  }, [dispatch, socket, user]);

  const remove = useCallback(() => {
    socket.emit('leave', { ...user });
    dispatch(removeRoom(user.room));
  }, [dispatch, socket, user]);

  return (
    <StyledSidebarFooter>
      {user.rooms.length > 1 && (
        <Button onClick={remove} sx={{ width: '100%' }} variant="outlined">
          Leave "{user.room}"
        </Button>
      )}
      <Button
        onClick={() => setShowConfirm(true)}
        sx={{ width: '100%' }}
        variant="contained"
      >
        Sign Off
      </Button>
      <CustomModal
        open={showConfirm}
        btnLabel="Leave"
        onSuccess={leave}
        onCancel={() => setShowConfirm(false)}
      >
        <Typography color="grey.900">
          Are you sure you want to leave? You will lose your username and chat
          rooms
        </Typography>
      </CustomModal>
    </StyledSidebarFooter>
  );
}
