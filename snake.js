let snake = [];
let dx = 20;
let dy = 0;
let food;
let score = 0;
let boxWidth = 160; // Largura da caixa de pontuação
let boxHeight = 40; // Altura da caixa de pontuação

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  snake = [{ x: 200, y: 200 }];
  food = gerarComida();
}

function draw() {
  background(0);

  // Desenhar comida
  fill(255, 0, 0);
  rect(food.x, food.y, 20, 20);

  // Desenhar cobra
  fill(0, 255, 0);
  for (let parte of snake) {
    rect(parte.x, parte.y, 20, 20);
  }

  // Mover cobra
  const novaCabeca = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(novaCabeca);

  // Comer comida ou remover último
  if (novaCabeca.x === food.x && novaCabeca.y === food.y) {
    food = gerarComida();
    score += 1; // Aumenta a pontuação
  } else {
    snake.pop();
  }

  // Colisão
  if (
    novaCabeca.x < 0 || novaCabeca.x >= width ||
    novaCabeca.y < 0 || novaCabeca.y >= height ||
    snake.slice(1).some(parte => parte.x === novaCabeca.x && parte.y === novaCabeca.y)
  ) {
    noLoop();
    alert("Game Over!");
    location.reload();
  }

  // Caixa de pontuação dentro da área de jogo
  fill(0, 0, 0, 150);  // Fundo da caixa (semi-transparente)
  rect(0, 0, boxWidth, boxHeight);  // Posiciona a caixa no canto superior esquerdo

  // Texto da pontuação
  fill(255);            // Cor do texto (branco)
  textSize(24);         // Tamanho do texto
  textAlign(LEFT, CENTER); // Alinha o texto à esquerda e no centro
  text("" + score, 10, boxHeight / 2);  // Coloca a pontuação dentro da caixa no canto superior esquerdo
}

function gerarComida() {
  return {
    x: floor(random(width / 20)) * 20,
    y: floor(random(height / 20)) * 20
  };
}

function keyPressed() {
  if (keyCode === UP_ARROW && dy === 0) {
    dx = 0;
    dy = -20;
  } else if (keyCode === DOWN_ARROW && dy === 0) {
    dx = 0;
    dy = 20;
  } else if (keyCode === LEFT_ARROW && dx === 0) {
    dx = -20;
    dy = 0;
  } else if (keyCode === RIGHT_ARROW && dx === 0) {
    dx = 20;
    dy = 0;
  }
}
