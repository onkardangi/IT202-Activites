const obstaclesList = [];

class Obstacles {

    constructor() {
        this.top = (Math.random() * canvas.height / 3);
        this.bottom = (Math.random() * canvas.height / 3);
        this.x = canvas.width;
        this.width = 20;
        //this.color = "black";
        this.color = "hsla(" + hue + ", 100%, 50%,1)";
        this.count = false;

    }

    draw() {
        ctx.fillStyle = this.color;
        //ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    }

    update() {
        this.x -= gameSpeed;
        if (!this.count && this.x < player1.x) {
            score++;
            this.count = true;
            document.querySelector("#score").textContent = "Score: " + score;
        }
        this.draw();
    }
}

function handleObstacles() {
    if (frame % 50 === 0) {
        obstaclesList.unshift(new Obstacles);
    }

    for (let i = 0; i < obstaclesList.length; i++) {
        obstaclesList[i].update();
    }

    if (obstaclesList.length > 20) {
        obstaclesList.pop(obstaclesList[0]);
    }
}