const socket = io('http://25.37.75.59:3000');
const roomName = new URLSearchParams(window.location.search).get('room');

socket.on('updatePlayers', (players) => {
    const playerListDiv = document.querySelector('.player-list');
    playerListDiv.innerHTML = '<h3>Players:</h3>';
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.textContent = player;
        playerListDiv.appendChild(playerDiv);
    });
});

socket.emit('joinRoom', { roomName, nickname: localStorage.getItem('nickname') });

socket.on('receiveHand', (hand) => {
    displayCards(hand);
});

function displayCards(hand) {
    const cardsContainer = document.querySelector('.player-cards');
    cardsContainer.innerHTML = '';
    hand.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <div class="card-name">${card.name}</div>
            <div class="card-text">${card.text}</div>
            <div class="card-footer">
                <div class="card-cost">${card.cost}</div>
                <div class="card-category">${card.category}</div>
            </div>
        `;
        cardsContainer.appendChild(cardElement);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    socket.on('connect', function() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'flex';
    });
});
