const board = document.querySelector('.board');
const startButton = document.querySelector('.btn-start');
const modal = document.querySelector('.modal');

const blockHeight = 50;
const blockWidth = 50;

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)
let intervalId = null;
let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }; // Initial food position

let blocks = []
const snake = [{
    x: 1, y: 3
}]
let direction = 'down';

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        block.innerHTML = `${row}-${col}`;
        blocks[`${row}-${col}`] = block;


    }
}

function render() {
    let head = null
    blocks[`${food.x}-${food.y}`].classList.add('food');


    if (direction === 'left') {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    }
    else if (direction === 'right') {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    }
    else if (direction === 'up') {
        head = { x: snake[0].x - 1, y: snake[0].y };
    }
    else if (direction === 'down') {
        head = { x: snake[0].x + 1, y: snake[0].y };
    }

    if (head.x < 0 || head.y < 0 || head.x >= rows || head.y >= cols) {
        alert('Game Over');
        clearInterval(intervalId);
    }

    if (head.x === food.x && head.y === food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove('food');
        food = {
            x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)
        };
        blocks[`${food.x}-${food.y}`].classList.add('food');
        snake.unshift(head);
    }



    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
    })

    snake.unshift(head);
    snake.pop();

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add('fill');
    })
}

intervalId = setInterval(() => {
    // render()
}, 300);


startButton.addEventListener('click', () => {
    modal.style.display = 'none';
    intervalId = setInterval(() => {
        render()
    }, 300);
})


addEventListener('keydown', (e) => {

    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        direction = 'up';
    }
    else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        direction = 'down';
    }
    else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        direction = 'left';
    }
    else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        direction = 'right';
    }

})
