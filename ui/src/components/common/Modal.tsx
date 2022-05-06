import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import React, { useCallback } from 'react';

type ModalPropTypes = {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  btnLabel?: string;
  children?: React.PropsWithChildren<React.ReactNode>;
};

export default function CustomModal(props: ModalPropTypes) {
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      props.onSuccess();
    },
    [props],
  );

  return (
    <Modal
      open={props.open}
      onClose={props.onCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          paddingTop: '1.5rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
        }}
      >
        <form onSubmit={handleSubmit}>
          {props.children}
          <Box
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              margin: '1rem 0',
            }}
          >
            <Button onClick={props.onCancel} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" sx={{ ml: 1 }} variant="contained">
              {props.btnLabel}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
