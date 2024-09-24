// socket.js
import { io } from 'socket.io-client';


export const initSocket = () => {
    let socket;
  if (!socket) {
    socket = io('http://localhost:3002'); // Remplacez par votre URL de backend
  }
  return socket;
};