import { createContext } from 'react';
import io from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_SERVER_URL || `http://localhost:${8081}`;

export const socket = io(ENDPOINT, { transports: ['websocket'] });
export const SocketContext = createContext(socket);
