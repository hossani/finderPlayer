import express, { Application } from 'express';
import dotenv from 'dotenv';
import routes from './routes/indexRoute'; // Adjust the path as needed
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

dotenv.config();
const app: Application = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Retirer le '/' à la fin
    methods: ["GET", "POST", "PATCH", "DELETE"],         // Autorise les méthodes HTTP spécifiques
  },
});

let onlineUsers: { user: { [key: string]: string },
 chat: {[key: string]: string} } = 
{ user: {}, chat:{} };

io.on('connection', (socket) => {
  // console.log('New connection', socket.id);

  socket.on('user_connected', (userId) => {
    // console.log('user connecter',userId)
    onlineUsers.user[userId] = socket.id;
});

socket.on('open_chat', ({userId,playerId}) => {
  console.log('afficher',userId,playerId)
  const key=String(userId)+'+'+String(playerId);
    onlineUsers.chat[key] = socket.id;
});

  // Envoi d'une demande d'amitié
  socket.on('send_friend_request', ({ fromUserId, toUserId,dataUser }) => {
    const receiverSocketId = onlineUsers.user[toUserId];
    // console.log('userId',toUserId)
    // console.log('hamza a envoyé request: ',fromUserId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit('receive_friend_request', {
            fromUserId,
            sender:dataUser,
        });
    } else {
        console.log('Utilisateur non en ligne');
    }
});

socket.on('send_message',  ({ id,senderId, receiverId, content,fullName, picture }) => {
  const key=String(receiverId)+'+'+String(senderId);
  const socketId = onlineUsers.chat[key];
  const userSocketId=onlineUsers.user[receiverId];
  console.log('id',id)
    if (socketId) {
      io.to(socketId).emit('receive_message', {
        id,
        content,
        senderId,
      });
    } else if(userSocketId){
      io.to(userSocketId).emit('receive_message_notification', {
        content,
        senderId,
        fullName,
        picture
      });
    }
}); 

socket.on('disconnect', () => {
  // console.log('User disconnected:', socket.id);
  // Supprimer l'utilisateur déconnecté
  for (let userId in onlineUsers.user) {
    if (onlineUsers.user[userId] === socket.id) {
      delete onlineUsers.user[userId];
      break;
    }
  }

  for (let key in onlineUsers.chat) {
    if (onlineUsers.chat[key] === socket.id) {
      delete onlineUsers.chat[key];
      break;
    }
  }

  // console.log('Online users après déconnexion:', onlineUsers);
});
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

const port: number | any = process.env.APP_PORT || 3002;
server.listen(port, () => {
  console.log(`Server is running on PORT ${port}...`);
});
