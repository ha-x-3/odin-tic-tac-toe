const Gameboard = (() => {

    let gameboard = ['', '', '', '', '', '', '', '', ''];

    const render = () => {
		let boardHTML = '';
		gameboard.forEach((square, index) => {
			boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
		});
		document.querySelector('#gameboard').innerHTML = boardHTML;
        const squares = document.querySelectorAll('.square');
		squares.forEach((square) => {
			square.addEventListener('click', Game.handleClick);
		});
	};

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    };

    //Accessory method to retrieve gameboard indirectly and prevent overwriting
    const getGameBoard = () => gameboard;

	return {
		render,
        update,
        getGameBoard,
	};

})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

const Game = (() => {

    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
			createPlayer(document.querySelector('#player1').value, 'X'),
			createPlayer(document.querySelector('#player2').value, 'O'),
		];
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    };

    const handleClick = (event) => {
        let index = parseInt(event.target.id.split("-")[1]); //Removes square- from id

        //Prevents overwriting square if already filled
        if (Gameboard.getGameBoard()[index] !== "") {
            return;
        }
            
        Gameboard.update(index, players[currentPlayerIndex].mark);
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, "");
        }
        Gameboard.render();
    };

    return {
        start,
        handleClick,
        restart,
    };

})();

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
    Game.restart();
});

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.start();
});