const CURRENT_USER_ID = 'user123'; // Substitua pelo ID real do usuário logado
    const socket = io('http://localhost:3000'); // Conecta ao seu servidor Socket.io
    const notificationDiv = document.getElementById('notificationContainer');

    socket.on('connect', () => {
        console.log('Conectado ao servidor Socket.io');
        // Registrar o usuário com o servidor assim que conectar
        socket.emit('registerUser', CURRENT_USER_ID);
    });

    // Ouvir por atualizações de status de notificações do servidor
    socket.on('notificationsStatus', (data) => {
        console.log('Recebida atualização de notificações:', data);
        if (notificationDiv) {
            if (data.hasNew) {
                notificationDiv.classList.add('notification-active');
                // Opcional: atualizar contador de notificações
            } else {
                notificationDiv.classList.remove('notification-active');
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('Desconectado do servidor Socket.io');
    });

    // Modificar a função handleNotificationClick para interagir via WebSocket
    function handleNotificationClick(url) {
        // Primeiro, navega para a página de notificações (ou abre um modal)
        mostrar(url);

        // Avisa o servidor que as notificações foram "lidas" via WebSocket
        socket.emit('markAsRead', CURRENT_USER_ID);
        // A bolinha será removida quando o servidor confirmar (via 'notificationsStatus' evento)
    }

    // Suas funções mostrar e removeNotificationBadge devem estar definidas
    function mostrar(id) {
        location.href = id;
    }

    // removeNotificationBadge não precisa ser chamada diretamente no handleNotificationClick
    // pois a remoção será orquestrada pelo evento 'notificationsStatus' do servidor.
    function removeNotificationBadge() {
        const notificationDiv = document.getElementById('notificationContainer');
        if (notificationDiv) {
            notificationDiv.classList.remove('notification-active');
        }
    }