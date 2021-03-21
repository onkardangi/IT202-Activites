let canvas = document.querySelector("canvas");
canvas.height = 600;
canvas.width = 400;

let ctx = canvas.getContext("2d");

let hue = 0;
let hue2 = 20;
let frame = 0;
let gameSpeed = 2;
let curr_img_index = 0;


let up = false;
let down = false;
let right = false;
let left = false;

let lives = 100;
let score = 0;

let bg_image = new Image();
bg_image.src = "background.jpg";

//js object
let BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

function drawBG() {
    if (BG.x1 <= -BG.width + gameSpeed) {
        BG.x1 = BG.width;
    } else {
        BG.x1 -= gameSpeed;
    }

    if (BG.x2 <= -BG.width + gameSpeed) {
        BG.x2 = BG.width;
    } else {
        BG.x2 -= gameSpeed;
    }

    ctx.drawImage(bg_image, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(bg_image, BG.x2, BG.y, BG.width, BG.height);
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBG();
    handleObstacles();
    handleCircles();
    player1.update();
    // if (frame % 10 == 0) {
    //     player1.draw();
    //     player1.move();
    // }
    player1.draw();
    player1.move();

    document.querySelector("#health").textContent = "Health: " + lives;

    if (detectCollision() || detectCollisionCircles()) {
        console.log(lives);
        lives -= 5;

        if (lives == 0) {
            document.querySelector("#health").textContent = "Lives: " + lives;
            ctx.font = "40px serif";
            ctx.fillStyle = "white";
            ctx.fillText("Game Over!!", (canvas.width / 2) - 80, (canvas.height / 2) - 10)
            return;
        }
    };


    //ctx.fillRect(10, canvas.height - 100, 30, 30);
    requestAnimationFrame(animate);
    hue++;
    hue2 += 5;
    frame++;
}

animate();

window.addEventListener("keydown", function(e) {
    if (e.code === "ArrowUp") {
        up = true;
    }
    if (e.code === "ArrowDown") {
        down = true;
    }
    // if (e.code === "ArrowRight") {
    //     right = true;
    // }
    // if (e.code === "ArrowLeft") {
    //     left = true;
    // }
})

window.addEventListener("keyup", function(e) {

    if (e.code === "ArrowUp") {
        up = false;
    }
    if (e.code === "ArrowDown") {
        down = false;
    }
    // if (e.code === "ArrowRight") {
    //     right = false;
    // }
    // if (e.code === "ArrowLeft") {
    //     left = false;
    // }
})

const collision = new Image();
collision.src = "collision.jpg";

function detectCollision() {
    for (let i = 0; i < obstaclesList.length; i++) {
        if (player1.x < obstaclesList[i].width + obstaclesList[i].x && player1.x + player1.width > obstaclesList[i].x && ((player1.y < 0 + obstaclesList[i].top && player1.y + player1.height > 0) || (player1.y > canvas.height - obstaclesList[i].bottom && player1.y + player1.height < canvas.height))) {
            ctx.drawImage(collision, player1.x, player1.y, 30, 60);
            return true;
        }
    }
}

function detectCollisionCircles() {
    for (let i = 0; i < circles.length; i++) {
        // if (player1.x < circles[i].rad + circles[i].x && player1.x + player1.width > circles[i].x && ((player1.y < 0 + circles[i].rad && player1.y + player1.height > 0) || (player1.y > canvas.height - circles[i].rad && player1.y + player1.height < canvas.height))) {
        //     ctx.drawImage(collision, player1.x, player1.y, 30, 60);
        //     console.log("Collision with circles")
        //     return true;

        // }

        var dx = circles[i].x - player1.x;
        var dy = circles[i].y - player1.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > circles[i].radius + player1.radius) {
            // collision detected!
            console.log("Collision with circles");
        }
    }
}