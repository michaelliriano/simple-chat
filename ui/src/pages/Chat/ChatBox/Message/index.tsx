import React from 'react';
import { Paper, Typography } from '@mui/material';
import moment from 'moment';

type MessagePropTypes = {
  isSender?: boolean;
  message?: string;
  sender?: String | undefined;
  timestamp?: Date;
};

export default function Message(props: MessagePropTypes) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: props.isSender ? 'flex-end' : 'flex-start',
      }}
    >
      {props.isSender ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}
        >
          <Paper
            elevation={3}
            style={{ position: 'relative' }}
            sx={{ mt: 1, mb: 1 }}
          >
            <Typography
              color="primary"
              style={{
                padding: '.5rem 1rem',
                color: '#fff',
                position: 'relative',
                wordBreak: 'break-all',
                whiteSpace: 'normal',
                maxWidth: 400,
              }}
            >
              {props.message}
            </Typography>
          </Paper>
          <Typography>{moment(props.timestamp).format('hh:mma')}</Typography>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <Paper
            style={{ backgroundColor: '#fff' }}
            sx={{ mt: 1, mb: 1 }}
            elevation={3}
          >
            <Typography
              style={{
                padding: '.5rem 1rem',
                color: '#000',
                position: 'relative',
                wordBreak: 'break-all',
                whiteSpace: 'normal',
                maxWidth: 400,
              }}
            >
              {props.message}
            </Typography>
          </Paper>

          <Typography>
            Sent by {props.sender} - {moment(props.timestamp).format('hh:mma')}
          </Typography>
        </div>
      )}
    </div>
  );
}
