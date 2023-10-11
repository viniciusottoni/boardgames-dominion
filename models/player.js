const Card = require('./card');

class Player {
    constructor(nickname) {
        this.nickname = nickname;
        this.deck = this.initializeDeck();
        this.hand = [];
    }

    initializeDeck() {
        let deck = [
            new Card('PROPRIEDADE', 'Vale 1 Ponto de Vitória', 2, 'VITÓRIA'),
            new Card('PROPRIEDADE', 'Vale 1 Ponto de Vitória', 2, 'VITÓRIA'),
            new Card('PROPRIEDADE', 'Vale 1 Ponto de Vitória', 2, 'VITÓRIA'),
            new Card('COBRE', 'Vale 1 Ponto de Tesouro', 0, 'TESOURO'),
            new Card('COBRE', 'Vale 1 Ponto de Tesouro', 0, 'TESOURO'),
            new Card('COBRE', 'Vale 1 Ponto de Tesouro', 0, 'TESOURO'),
            new Card('COBRE', 'Vale 1 Ponto de Tesouro', 0, 'TESOURO'),
            new Card('COBRE', 'Vale 1 Ponto de Tesouro', 0, 'TESOURO'),
            new Card('COBRE', 'Vale 1 Ponto de Tesouro', 0, 'TESOURO'),
            new Card('COBRE', 'Vale 1 Ponto de Tesouro', 0, 'TESOURO')
        ];
        return this.shuffle(deck);
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    drawCards(num) {
        this.hand = this.deck.splice(0, num);
    }
}

module.exports = Player;