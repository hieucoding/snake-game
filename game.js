// const inGame = true
// init = function (canvas, ctx, head, body, apple, dots,) {
//   canvas = document.getElementById("myCanvas");
//   ctx.canvas.getContext("2d");
//   this.drawImage = function () {
//     head = new Image();
//     head.src = "head.png";
//     body = new Image();
//     body.src = "dot.png";
//     apple = new Image();
//     apple.src = "apple.png";
//   };
//   this.createSnake = function () {
//     dots = 3;
//     for (var z = 0; z < dots; z++) {
//       x[z] = 50 - z * 10;
//       y[z] = 50;
//     }
//   };
//   this.locateApple = function () {
//     var r = Math.floor(Math.random() * 29);
//     apple_x = r * 10;
//     r = Math.floor(Math.random() * 29);
//     apple_y = r * 10;
//   };
//   setTimeout("gameCycle()", 140);
// };
// gameCycle = function () {
//   if (inGame) {
//     this.checkApple = function () {
//       if (x[0] == apple_x && y[0] == apple_y) {
//         dots++;
//         locateApple();
//       }
//     };
//     this.checkCollision = function () {
//       for (var z = dots; z > 0; z--) {
//         if (z > 4 && x[0] == x[z] && y[0] == y[z]) {
//           inGame = false;
//         }
//       }
//       if (y[0] > 300) {
//         inGame = false;
//       }
//       if (x[0] > 300) {
//         inGame = false;
//       }
//       if (x[0] < 0) {
//         inGame = false;
//       }
//       if (y[0] < 0) {
//         inGame = false;
//       }
//     };
//     this.move = function () {
//       for (var z = dots; z > 0; z--) {
//         x[z] = x[z - 1];
//         y[z] = y[z - 1];
//       }
//       if (leftDirection) {
//         x[0] -= 10;
//       }
//       if (rightDirection) {
//         x[0] += 10;
//       }
//       if (upDirection) {
//         y[0] -= 10;
//       }
//       if (downDirection) {
//         y[0] += 10;
//       }
//     };
//     this.doDrawing = function () {
//       ctx.clearRect(0, 0, 300, 300);
//       if (inGame) {
//         ctx.drawImage(apple, apple_x, apple_y);
//         for (var z = 0; z < dots; z++) {
//           if (z == 0) {
//             ctx.drawImage(head, x[z], y[z]);
//           } else {
//             ctx.drawImage(ball, x[z], y[z]);
//           }
//         }
//       } else {
//         gameOver();
//       }
//     };
//     gameOver = function () {
//       ctx.fillStyle = "white";
//       ctx.textBaseline = "middle";
//       ctx.textAlign = "center";
//       ctx.font = "normal bold 18px serif";
//       ctx.fillText("Game over", 300 / 2, 300 / 2);
//     };
//     setTimeout("gameCycle()", 140);
//   }
// };
// var rightDirection = true
// var leftDirection = false
// var upDirection = false
// var downDirection = false
// onkeydown = function (e) {
//   var key = e.keyCode;
//   if (key == 37 && !rightDirection) {
//     leftDirection = true;
//     upDirection = false;
//     downDirection = false;
//   }

//   if (key == 39 && !leftDirection) {
//     rightDirection = true;
//     upDirection = false;
//     downDirection = false;
//   }

//   if (key == 38 && !downDirection) {
//     upDirection = true;
//     rightDirection = false;
//     leftDirection = false;
//   }

//   if (key == 40 && !upDirection) {
//     downDirection = true;
//     rightDirection = false;
//     leftDirection = false;
//   }
// };

class Snake {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.head = new Image();
    this.head.src = "head.png";
    this.body = new Image();
    this.body.src = "dot.png";
    this.dots = 3;
    this.x = [];
    this.y = [];
    for (let z = 0; z < this.dots; z++) {
      this.x[z] = 50 - z * 10;
      this.y[z] = 50;
    }
    this.rightDirection = true;
    this.leftDirection = false;
    this.upDirection = false;
    this.downDirection = false;
  }

  move() {
    for (let z = this.dots; z > 0; z--) {
      this.x[z] = this.x[z - 1];
      this.y[z] = this.y[z - 1];
    }
    if (this.leftDirection) {
      this.x[0] -= 10;
    }
    if (this.rightDirection) {
      this.x[0] += 10;
    }
    if (this.upDirection) {
      this.y[0] -= 10;
    }
    if (this.downDirection) {
      this.y[0] += 10;
    }
  }

  checkCollision() {
    for (let z = this.dots; z > 0; z--) {
      if (z > 4 && this.x[0] === this.x[z] && this.y[0] === this.y[z]) {
        return true;
      }
    }
    if (this.y[0] > 300 || this.x[0] > 300 || this.x[0] < 0 || this.y[0] < 0) {
      return true;
    }
    return false;
  }

  checkApple(apple) {
    if (this.x[0] === apple.x && this.y[0] === apple.y) {
      this.dots++;
      apple.locate();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, 300, 300);
    this.ctx.drawImage(apple.image, apple.x, apple.y);
    for (let z = 0; z < this.dots; z++) {
      if (z === 0) {
        this.ctx.drawImage(this.head, this.x[z], this.y[z]);
      } else {
        this.ctx.drawImage(this.body, this.x[z], this.y[z]);
      }
    }
  }
}

class Apple {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.image = new Image();
    this.image.src = "apple.png";
    this.x = 0;
    this.y = 0;
    this.locate();
  }

  locate() {
    const r = Math.floor(Math.random() * 29);
    this.x = r * 10;
    this.y = r * 10;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y);
  }
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const snake = new Snake(canvas, ctx);
const apple = new Apple(canvas, ctx);

function gameCycle() {
  if (!snake.checkCollision()) {
    snake.checkApple(apple);
    snake.move();
    snake.draw();
    setTimeout(gameCycle(), 500);
  }
}

/// gameCycle = function () {
//   if (!inGame) {
//     return gameOver();
//   }
  
//   checkApple();
//   checkCollision();
//   move();
//   doDrawing();
  
//   setTimeout(gameCycle, 140);
// };
