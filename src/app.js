
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
		console.log("pc");
	}

	function verificaResultado (gameData) {
		const { numOfJogadas, playerOneJogadas, playerTwoJogadas } = gameData;
		if (playerOneJogadas > 2) {
			const eixoXResult = eixoX("X");
			const eixoYResult = eixoY("X");
			const diagonalResult = diagonal("X");
			if (eixoXResult || eixoYResult || diagonalResult) {
				alert("Jogador 1 Venceu: X");
				location.reload();
			}
		} 

		if (playerTwoJogadas > 2) {
			const eixoXResult = eixoX("O"); 
			const eixoYResult = eixoY("O"); 
			const diagonalResult = diagonal("O");
			if (eixoXResult || eixoYResult || diagonalResult) {
				alert("Jogador 2 Venceu: O");
				location.reload();
			}
		}

		if (numOfJogadas > 8) {
			alert("Empate!"); 
			location.reload();
		}


		function eixoY (player) {
			let firstColumn = 0;
			let secondColumn = 0;
			let thirdColumn = 0;

			for (let i = 0, len = 3; i < len; i++) {
				if (btnFirstColumn[i].textContent === player) {
					firstColumn++;

				} else if (btnSecondColumn[i].textContent === player) {
					secondColumn++;

				} else if (btnLastColumn[i].textContent === player) {
					thirdColumn++;

				}
			}

			if (firstColumn === 3) {
				setWinner("first-column");
			} else if (secondColumn === 3) {
				setWinner("second-column");
			} else if (thirdColumn === 3) {
				setWinner("third-Column");
			}

			if (firstColumn === 3 || secondColumn === 3 || thirdColumn === 3) {
				
				blockFileds(buttons, true);
				return true;
			}
		}

		function eixoX (player) {
			let firstRow = 0;
			let secondRow = 0;
			let thirdRow = 0;

			for (let i = 0, len = 3; i < len; i++) {
				if (btnfirstRow[i].textContent === player) {
					firstRow++;

				} else if (btnsecondRow[i].textContent === player) {
					secondRow++;

				} else if (btnlastRow[i].textContent === player) {
					thirdRow++;

				}
			}

			if (firstRow === 3) {
				setWinner("first-row");
			} else if (secondRow === 3) {
				setWinner("second-row");
			} else if (thirdRow === 3) {
				setWinner("last-row");
			}

			if (firstRow === 3 || secondRow === 3 || thirdRow === 3) {
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
			
			if (countCel1 === 3) {
				setWinner("diagonal-A")
			} else if (countCel2 == 3) {
				setWinner("diagonal-B");
			}

			if (countCel1 === 3 || countCel2 === 3) {
				blockFileds(buttons, true);
				return true;
			}

		}

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
		const columns = ["first-column", "second-column", "third-Column"];
		const diagonais = ["diagonal-A", "diagonal-B"];

		if (rows.includes(area)) {
			area = `.${area}`;
			const row = document.querySelector(area);
			row.classList.add("winner");
		} 

		else if (columns.includes(area)) {
			area = `.${area}`;
			// const column = document.querySelector(area);
			// column.classList.add("winner");
		} 

		else if (diagonais.includes(area)) {
			const row = document.querySelector(".first-row");
			row.classList.add("winner")
			row.classList.add(area);
		}
	}

	return { p1p2, p1com };

})();

const btnStartP1 = document.querySelector("#btn-p1vsp2");
const btnStartCOM = document.querySelector("#btn-p1vscom");

btnStartP1.addEventListener("click", () => {
	startGame.p1p2();
});

btnStartCOM.addEventListener("click", () => {
	startGame.p1com();
});