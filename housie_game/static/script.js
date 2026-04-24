let availableNumbers = [];
const board = document.getElementById('board');
const drawBtn = document.getElementById('draw-btn');
const display = document.getElementById('current-number');
const counterLabel = document.getElementById('counter');

// 1. Create numbers 1 to 90 and the board cells
function initGame() {
    for (let i = 1; i <= 90; i++) {
        availableNumbers.push(i);
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${i}`;
        cell.textContent = i;
        board.appendChild(cell);
    }
}

// 2. Logic to pick a random number without repeating
function drawNumber() {
    if (availableNumbers.length === 0) {
        alert("All numbers have been drawn!");
        return;
    }

    drawBtn.disabled = true; // Disable to prevent animation glitching

    // Visual Rolling Animation (Short loop before landing on the number)
    let rollCount = 0;
    const rollInterval = setInterval(() => {
        display.textContent = Math.floor(Math.random() * 90) + 1;
        rollCount++;
        
        if (rollCount > 15) {
            clearInterval(rollInterval);
            finalizeDraw();
        }
    }, 40);
}

function finalizeDraw() {
    // Pick a random index from the remaining numbers
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const drawnNumber = availableNumbers.splice(randomIndex, 1)[0];

    // Update UI
    display.textContent = drawnNumber;
    const cell = document.getElementById(`cell-${drawnNumber}`);
    cell.classList.add('active');
    
    counterLabel.textContent = `Numbers remaining: ${availableNumbers.length}`;
    drawBtn.disabled = false;
}

// Event Listeners
drawBtn.addEventListener('click', drawNumber);
window.onload = initGame;