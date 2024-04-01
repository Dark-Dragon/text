function generateBingoBoard() {
	// Get the board size from the input
	const boardSize = parseInt(document.getElementById('boardSize').value);

	// Generate an array of unique random numbers for the board
	const numbers = Array.from({ length: boardSize * boardSize }, (_, index) => index + 1);
	const shuffledNumbers = shuffleArray(numbers);

	// Create the bingo board HTML
	let boardHtml = '<table>';
	for (let i = 0; i < boardSize; i++) {
		boardHtml += '<tr>';
		for (let j = 0; j < boardSize; j++) {
			const number = shuffledNumbers[i * boardSize + j];
			boardHtml += `<td>${number}</td>`;
		}
		boardHtml += '</tr>';
	}
	boardHtml += '</table>';

	// Display the bingo board
	document.getElementById('bingoBoard').innerHTML = boardHtml;

	// Update URL parameters with the state of the board
	const boardState = shuffledNumbers.join(',');
	const newUrl = `${window.location.origin}${window.location.pathname}?boardSize=${boardSize}&boardState=${boardState}`;
	window.history.replaceState({ path: newUrl }, '', newUrl);
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// Function to parse the URL parameters
function getParams() {
	const params = new URLSearchParams(window.location.search);
	return {
		boardSize: parseInt(params.get('boardSize')) || 5,
		boardState: params.get('boardState'),
	};
}

// Initialize the board based on URL parameters on page load
window.onload = function () {
	const { boardSize, boardState } = getParams();
	document.getElementById('boardSize').value = boardSize;
	if (boardState) {
		const shuffledNumbers = boardState.split(',').map(Number);
		const boardHtml = generateBoardHtml(boardSize, shuffledNumbers);
		document.getElementById('bingoBoard').innerHTML = boardHtml;
	}
	
	var combobox = document.getElementById("bingoList");
	
	fetch('bingo.json')
		.then(response => {
			// Check if the request was successful
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json(); // Parse the JSON from the response
		})
		.then(data => {
			// Here, 'data' is the JSON data you retrieved
			console.log(data);
			// Process your data here
			
			data.bingo.forEach(bingo => {
				console.log("Name: " + bingo.name + ", Description: " + bingo.description);
				var newOption = document.createElement("option");
			  
				newOption.value = bingo.description;
				newOption.text = bingo.name;
				
				combobox.appendChild(newOption);
			});
			
		})
		.catch(error => {
			// Handle any errors
			console.error('There was a problem with the fetch operation:', error);
		});
		
	
};

// Function to generate HTML for the bingo board
function generateBoardHtml(boardSize, shuffledNumbers) {
	let boardHtml = '<table>';
	for (let i = 0; i < boardSize; i++) {
		boardHtml += '<tr>';
		for (let j = 0; j < boardSize; j++) {
			const number = shuffledNumbers[i * boardSize + j];
			boardHtml += `<td>${number}</td>`;
		}
		boardHtml += '</tr>';
	}
	boardHtml += '</table>';
	return boardHtml;
}