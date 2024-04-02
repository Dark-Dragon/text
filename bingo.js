var bingoData;

function generateBingoBoard() {
	var bingoComboBox = document.getElementById("bingoList")
	var bingoComboBoxSelectedIndex = bingoComboBox.selectedIndex
	var selectedBingo = bingoComboBox.options[bingoComboBoxSelectedIndex]
	
	console.log("selection is: " + selectedBingo.text);
	
	var seed = getURLSeed();
	
	var wordList = bingoData[selectedBingo.text].entries;
	
	console.log(wordList);
	
	wordList = shuffleArrayWithSeed(wordList,seed)
	
	console.log(wordList);
	
	const boardSize = parseInt(document.getElementById("boardSize").value);
	var htmlTable = '<table>';
	
	for (let i = 0; i < boardSize; i++) {
		htmlTable += '<tr>';
		for (let j = 0; j < boardSize; j++) {
			let cell = wordList.pop() || "";
			htmlTable += '<td>'+cell+'</td>';
		}
		htmlTable += '</tr>';
	}
	htmlTable += '</table>';
	
	document.getElementById('bingoBoard').innerHTML = htmlTable;
	
	var cells = document.querySelectorAll('#bingoBoard td');

    // Add click event listener to each <td> element
    cells.forEach(function(cell) {
        cell.addEventListener('click', function() {
            // Toggle the 'clicked' class to change background color
            cell.classList.toggle('clicked');
        });
    });
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArrayWithSeed(array,sd) {
	
	var randomSeed = new Math.seedrandom(sd);
	
	let copy = [...array];
	let newArray = [];
	
	while (copy.length > 0) {
		var rand = randomSeed();
		var index = Math.ceil(copy.length * rand)-1;
		newArray.push(copy[index]);
		copy.splice(index,1);
	}
	return newArray;
}

function getURLSeed() {
	const seed = parseInt(new URLSearchParams(window.location.search).get('seed'));
	return seed;
}

// Initialize the board based on URL parameters on page load
window.onload = function () {

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
			
			bingoData = data;
			
			for (const key in data) {
				console.log("Name: " + key + ", Description: " + data[key].description);
				
				var newOption = document.createElement("option");
			  
				newOption.value = data[key];
				newOption.text = key;
				
				combobox.appendChild(newOption);
			}
			
		})
		.catch(error => {
			// Handle any errors
			console.error('There was a problem with the fetch operation:', error);
		});
	
	var seed = getURLSeed()
	
	console.log("Existing seed is: " + seed)

	if (!seed) {
		
		let newSeed = Math.random().toString().slice(2)
		
		console.log("Generated new seed: " + newSeed)

		const newUrl = `${window.location.origin}${window.location.pathname}?seed=${newSeed}`;
		window.history.replaceState({ path: newUrl }, '', newUrl);
	}
	
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