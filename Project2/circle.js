const circles = []
let radius = 50;

class Circle {

    constructor() {
        this.rad = Math.floor(Math.random() * 25) + 5;
        //this.x = radius + (Math.random() * (canvas.width - (2 * radius)));
        this.x = canvas.width;
        this.y = radius + (Math.random() * (canvas.height - (2 * radius)));
        this.color = "hsla(" + hue2 + ", 100%, 50%,1)";
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.lineWidth = 5;
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    update() {
        this.x -= gameSpeed;
        this.draw();
    }
}

function handleCircles() {
    if (frame % 50 === 0) {
        circles.unshift(new Circle);
    }

    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
    }

    if (circles.length > 20) {
        circles.pop(circles[0]);
    }
}