export default class BronzeTrophy {
    leftLane;
    middleLane;
    rightLane;
    image;
    positionX;
    positionY;
    speed;
    canvas;
    points;
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = (this.canvas.width / 4) * 3;
        const random = BronzeTrophy.randomInteger(1, 3);
        console.log(random);
        if (random === 1) {
            this.positionX = this.leftLane;
        }
        if (random === 2) {
            this.positionX = this.middleLane;
        }
        if (random === 3) {
            this.positionX = this.rightLane;
        }
        this.image = BronzeTrophy.loadNewImage('assets/img/objects/bronze_trophy.png');
        this.positionY = 60;
        this.speed = 0.5;
        this.points = 1;
    }
    getPositionX() {
        return this.positionX;
    }
    getPositionY() {
        return this.positionY;
    }
    getImage() {
        return this.image;
    }
    getPoints() {
        return this.points;
    }
    move(elapsed) {
        this.positionY += this.speed * elapsed;
    }
    isCollidingWithBorders() {
        if (this.positionY + this.image.height > this.canvas.height) {
            return true;
        }
        return false;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.positionY);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=BronzeTrophy.js.map