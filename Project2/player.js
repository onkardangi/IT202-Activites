let img = new Image();
img.src = "spritestrip.png";

let spriteH = img.height;
let spriteW = spriteH;

class Player {
    constructor() {
        this.x = 150;
        this.y = 200;
        this.v = 0;
        this.ogWidth = spriteW;
        this.ogHeight = spriteH
        this.width = 20;
        this.height = 20;
        this.weight = 0;
        this.frameRate = 0;
        this.radius = 10;
    }

    update() {
        if (this.y > canvas.height - (this.height * 2)) {
            this.y = canvas.height - (this.height * 2);
            this.v = 0;
        } else {
            this.v += this.weight;
            this.y += this.v;
        }

        if (up) {
            this.y -= 20;
            console.log(this.y);
        }
        if (down) {
            this.y += 20;
            console.log(this.y);
        }
        if (right) {
            this.x += 10;
            console.log(this);
        }
        if (left) {
            this.x -= 10;
            console.log(this.x);
        }


        if (this.y < 0 + this.height) {
            this.y = 0 + this.height;
        }
        if (this.x < 0 + this.width) {
            this.x = 0 + this.width;
        }


    }


    draw() {
        ctx.fillStyle = "blue";
        //ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.drawImage(img, this.frameRate * img.height, 0, img.height, img.height, this.x - 10, this.y - 25, img.height * 0.2, img.height * 0.3);
        //ctx.drawImage(img, img.height * 1, 0, img.height, img.height, 300, 50, img.height * 0.3, img.height * 0.4);
    }

    move() {
        // if (this.frameRate % 10 == 0) {
        //     this.frameRate = this.frameRate == 5 ? 0 : this.frameRate += 1;
        // }
        if (this.frameRate >= 5) {
            this.frameRate = 0;
        } else {
            this.frameRate++;
        }
    }
}

const player1 = new Player();