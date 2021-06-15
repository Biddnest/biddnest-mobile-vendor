import {io} from 'socket.io-client';

export const SocketURL = io('http://139.59.27.112:6001', {
  transports: ['websocket'],
});
