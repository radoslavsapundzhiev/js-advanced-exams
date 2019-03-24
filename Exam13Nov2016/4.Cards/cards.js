function cardDeckBuilder(selector) {
    let faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let suits = {
        C: '\u2663',
        D: '\u2666',
        H: '\u2665',
        S: '\u2660'
    };
    let cards = [];

    function reverse() {
        console.log('clicked!');
        cards.reverse();
        $(selector).empty();
        for (let card of cards) {
            $(selector).append(card);
            card.on('click', reverse);
        }
    }

    return {
        addCard: function (face, suit) {
            let card = $('<div>').addClass('card').text(`${face} ${suits[suit]}`);
            $(selector).append(card);
            cards.push(card);
            card.on('click', reverse);
        }
    }
}