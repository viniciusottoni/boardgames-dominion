const socket = io('http://25.37.75.59:3000');

function createRoom() {
    let nickname = document.getElementById('nickname').value;
    if (!nickname) {
        alert('Please enter a nickname!');
        return;
    }
    let roomName = prompt("Enter room name:");
    if (roomName) {
        socket.emit('joinRoom', { roomName, nickname });
        localStorage.setItem('nickname', nickname);
        window.location.href = `room.html?room=${roomName}`;
    }
}

function joinRoom() {
    let nickname = document.getElementById('nickname').value;
    if (!nickname) {
        alert('Please enter a nickname!');
        return;
    }
    let roomId = prompt("Enter room ID:");
    if (roomId) {
        socket.emit('checkRoomExistence', roomId, (exists) => {
            if (exists) {
                socket.emit('joinRoom', { roomName: roomId, nickname });
                localStorage.setItem('nickname', nickname);
                window.location.href = `room.html?room=${roomId}`;
            } else {
                alert('The room does not exist!');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    socket.on('connect', function() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'flex';
    });
});
