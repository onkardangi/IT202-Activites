document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.querySelector("#html-canvas");
    let circles = [];
    var radius = 50;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    let context = canvas.getContext("2d");

    for (var i = 0; i < 20; i++) {
        var radius = Math.floor(Math.random() * 25) + 5;
        var x = radius + (Math.random() * (canvas.width - (2 * radius)));
        var y = radius + (Math.random() * (canvas.height - (2 * radius)));
        var colour = randomColour();
        var direction = Math.random() * 2.0 * Math.PI;
        circles.push({
            x: x,
            y: y,
            colour: colour,
            radius: radius,
            direction: direction
        });
    }

    draw();

    function randomColour() {
        var chars = '0123456789ABCDEF';
        var colour = '#';
        for (var i = 0; i < 6; i++) {
            colour += chars[Math.floor(Math.random() * 16)];
        }
        return colour;
    }

    function drawCircle(x, y, radius, border, border_colour, fill_colour) {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.strokeStyle = border_colour;
        context.fillStyle = fill_colour;
        context.lineWidth = border;
        context.closePath();
        context.fill();
        context.stroke();
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        circles.forEach(function(circle) {
            circle.x = circle.x + Math.cos(circle.direction);
            circle.y = circle.y + Math.sin(circle.direction);
            drawCircle(circle.x, circle.y, circle.radius, 5, circle.colour, circle.colour);
            bounce(circle);
        });
        requestAnimationFrame(draw);
    }

    function bounce(circle) {
        if (((circle.x - circle.radius) < 0) || ((circle.y - circle.radius) < 0) || ((circle.x + circle.radius) > canvas.width) || ((circle.y + radius) > canvas.height)) {
            circle.direction += (Math.PI / 2);
        }
        if (circle.direction > (2 * Math.PI)) {
            circle.direction -= (2 * Math.PI);
        }
    }

}, false);