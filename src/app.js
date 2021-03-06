
const startGame = (() => {
	
	const btnfirstRow = document.querySelectorAll(".first-row .btn");
	const btnsecondRow = document.querySelectorAll(".second-row .btn");
	const btnlastRow = document.querySelectorAll(".last-row .btn");
	
	const btnFirstColumn = document.querySelectorAll(".game .btn:first-child");
	const btnSecondColumn = document.querySelectorAll(".game .btn:nth-child(2)");
	const btnLastColumn = document.querySelectorAll(".game .btn:last-child");
			
	const buttons = document.querySelectorAll(".game .btn");
	

	const p1p2 = () => {
		
		clearFields(buttons);
		blockFileds(buttons, false);
		let playerClick = false;
		let numOfJogadas = 0;
		let playerOneJogadas = 0;
		let playerTwoJogadas = 0;
		for (let i = 0, len = buttons.length; i < len; i++) {
			buttons[i].addEventListener("click", function () {
				numOfJogadas++;
				this.disabled = true;
				if (!playerClick) {
					this.textContent = "X"; playerClick = true;
					playerOneJogadas++;
				} else {
					this.textContent = "O"; playerClick = false;
					playerTwoJogadas++;
				}
				verificaResultado({ numOfJogadas, playerOneJogadas, playerTwoJogadas });
			});
		}
	}

	const p1com = () => {
		clearFields(buttons);
		blockFileds(buttons, false);
		let playerClick = false;
		let numOfJogadas = 0;
		let playerOneJogadas = 0;
		let playerTwoJogadas = 0;
		for (let i = 0, len = buttons.length; i < len; i++) {
			buttons[i].addEventListener("click", function () {
				numOfJogadas++;
				if (!playerClick) {
					this.textContent = "X"; playerClick = true;
					playerOneJogadas++;
					this.disabled = true;
					const pc = setTimeout(() => {
						PCPlay();
						playerClick = false;
						playerTwoJogadas += 1;
						numOfJogadas++;
						verificaResultado({ numOfJogadas, playerOneJogadas, playerTwoJogadas });
					}, 1000);
					verificaResultado({ numOfJogadas, playerOneJogadas, playerTwoJogadas });
				}
			});
		}

		let btnIndex;
		function PCPlay () {
			btnIndex = Math.floor(Math.random() * buttons.length);
			if (buttons[btnIndex].textContent === "") {
				buttons[btnIndex].textContent = "O";
				buttons[btnIndex].disabled = true;
			} else {
				PCPlay();
			}

		}

	}

	function verificaResultado (gameData) {
		const { numOfJogadas, playerOneJogadas, playerTwoJogadas } = gameData;
		let winner = false;
		
		if (playerOneJogadas > 2) {
			const eixoXResult = eixoX("X");
			const eixoYResult = eixoY("X");
			const diagonalResult = diagonal("X");
			if (eixoXResult || eixoYResult || diagonalResult) {
				alert("Jogador 1 Venceu: X");
				location.reload();
				winner = true;
			}
		} 

		if (playerTwoJogadas > 2) {
			const eixoXResult = eixoX("O"); 
			const eixoYResult = eixoY("O"); 
			const diagonalResult = diagonal("O");
			if (eixoXResult || eixoYResult || diagonalResult) {
				alert("Jogador 2 Venceu: O");
				location.reload();
				winner = true;
			}
		}

		if (numOfJogadas > 8 && !winner) {
			alert("Empate!"); 
			location.reload();
		}


		function eixoY (player) {
			let firstColumn = 0;
			let secondColumn = 0;
			let thirdColumn = 0;

			for (let i = 0, len = 3; i < len; i++) {
				if (btnFirstColumn[i].textContent === player) firstColumn++;
				if (btnSecondColumn[i].textContent === player) secondColumn++;
				if (btnLastColumn[i].textContent === player) thirdColumn++;
			}

			if (firstColumn > 2) {
				setWinner("first-column");
			} else if (secondColumn > 2) {
				setWinner("second-column");
			} else if (thirdColumn > 2) {
				setWinner("third-column");
			}
			if (firstColumn > 2 || secondColumn > 2 || thirdColumn > 2) {
				
				blockFileds(buttons, true);
				return true;
			}
		}

		function eixoX (player) {
			let firstRow = 0;
			let secondRow = 0;
			let thirdRow = 0;

			for (let i = 0, len = 3; i < len; i++) {
				if (btnfirstRow[i].textContent === player) firstRow++;
				if (btnsecondRow[i].textContent === player) secondRow++;
				if (btnlastRow[i].textContent === player) thirdRow++;
			}

			if (firstRow > 2) {
				setWinner("first-row");
			} else if (secondRow > 2) {
				setWinner("second-row");
			} else if (thirdRow > 2) {
				setWinner("last-row");
			}

			if (firstRow > 2 || secondRow > 2 || thirdRow > 2) {
				blockFileds(buttons, true);
				return true;
			}
		}

		function diagonal (player) {
			let firstButton = btnfirstRow[0];
			const secondButton = btnsecondRow[1];
			const thirdButton = btnlastRow[2];
			const diagonalButtons1 = [firstButton, secondButton, thirdButton];
			let countCel1 = 0;

			for (let i = 0, len = 3; i < len; i++) {
				if (diagonalButtons1[i].textContent === player) {
					countCel1++;
				}
			}

			const lastButton = btnfirstRow[2];
				  firstButton = btnlastRow[0];
			
			const diagonalButtons2 = [firstButton, secondButton, lastButton];
			let countCel2 = 0; 
			for (let i = 0, len = 3; i < len; i++) {
				if (diagonalButtons2[i].textContent === player) {
					countCel2++;
				}
			}
			
			if (countCel1 > 2) {
				setWinner("diagonal-A")
			} else if (countCel2 > 2) {
				setWinner("diagonal-B");
			}

			if (countCel1 > 2 || countCel2 > 2) {
				blockFileds(buttons, true);
				return true;
			}

		}

	}

	function render () {
		const title = document.querySelector('h2.text-center');
		title.hidden = true;
	}

	function blockFileds (fields, state) {
		for (let i = 0, len = fields.length; i < len; i++) {
			fields[i].disabled = state;
		}
	}

	function clearFields (fields, state) {
		for (let i = 0, len = fields.length; i < len; i++) {
			fields[i].textContent = "";
		}
	}

	function setWinner (area) {
		const rows = ["first-row", "second-row", "last-row"];
		const columns = ["first-column", "second-column", "third-column"];
		const diagonais = ["diagonal-A", "diagonal-B"];

		if (rows.includes(area)) {
			area = `.${area}`;
			const row = document.querySelector(area);
			row.classList.add("winner");
		} 

		else if (columns.includes(area)) {
			area = `.${area}`;
			const column = document.querySelector(area);
			column.classList.add("winner");
			column.classList.add("cl");
			if (area.includes("first") || area.includes("third")) {
				column.classList.add(area.slice(1, 6));
			}
		} 

		else if (diagonais.includes(area)) {
			const row = document.querySelector(".first-row");
			row.classList.add("winner")
			row.classList.add(area);
		}
	}

	return { p1p2, p1com, render };

})();

const btnStartP1 = document.querySelector("#btn-p1vsp2");
const btnStartCOM = document.querySelector("#btn-p1vscom");

btnStartP1.addEventListener("click", () => {
	startGame.render();
	startGame.p1p2();
});

btnStartCOM.addEventListener("click", () => {
	startGame.render();
	startGame.p1com();
});