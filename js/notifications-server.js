// server.js (Exemplo com Socket.io)
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://127.0.0.1:5500", // Permita seu frontend (Ex: Live Server)
        methods: ["GET", "POST"]
    }
});

app.use(cors());

// Simulação de banco de dados ou estado de notificações
let userNotifications = {
    'user123': {
        hasNew: false,
        count: 0,
        messages: []
    },
    'userABC': {
        hasNew: false,
        count: 0,
        messages: []
    }
};

// Quando um cliente se conecta via WebSocket
io.on('connection', (socket) => {
    console.log('Novo cliente conectado!');

    // Ao conectar, o cliente pode enviar seu userId para o servidor
    socket.on('registerUser', (userId) => {
        socket.userId = userId; // Armazena o userId na conexão do socket
        console.log(`Usuário ${userId} registrado no socket.`);

        // Envia o estado atual das notificações para o usuário recém-conectado
        const notifications = userNotifications[userId] || { hasNew: false, count: 0, messages: [] };
        socket.emit('notificationsStatus', notifications);
    });

    // Quando o cliente marca as notificações como lidas
    socket.on('markAsRead', (userId) => {
        if (userNotifications[userId]) {
            userNotifications[userId].hasNew = false;
            userNotifications[userId].count = 0;
            userNotifications[userId].messages = [];
            console.log(`Notificações de ${userId} marcadas como lidas via WebSocket.`);
            // Opcional: confirma para o cliente que foi lido
            socket.emit('notificationsStatus', userNotifications[userId]);
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado.');
    });
});

// Função para simular o envio de uma nova notificação
function sendNewNotification(userId, message) {
    if (userNotifications[userId]) {
        userNotifications[userId].hasNew = true;
        userNotifications[userId].count += 1;
        userNotifications[userId].messages.push(message);

        // Envia a notificação para o usuário específico se ele estiver conectado
        io.sockets.sockets.forEach(socket => {
            if (socket.userId === userId) {
                socket.emit('notificationsStatus', userNotifications[userId]);
            }
        });
        console.log(`Nova notificação para ${userId}: ${message}`);
    }
}

// Simular uma nova notificação chegando para 'user123' após 10 segundos
setTimeout(() => {
    sendNewNotification('user123', 'Uma nova atividade foi adicionada!');
}, 10000);

server.listen(3000, () => {
    console.log('Servidor Socket.io rodando na porta 3000');
});