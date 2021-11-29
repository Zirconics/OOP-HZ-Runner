export default class RedCross {
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
        const random = RedCross.randomInteger(1, 3);
        if (random === 1) {
            this.positionX = this.leftLane;
        }
        if (random === 2) {
            this.positionX = this.middleLane;
        }
        if (random === 3) {
            this.positionX = this.rightLane;
        }
        this.image = RedCross.loadNewImage('assets/img/objects/face_on_cross.png');
        this.positionY = 60;
        this.speed = 1.0;
        this.points = -5;
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
    move(elapsed) {
        this.positionY += this.speed * elapsed;
    }
    getPoints() {
        return this.points;
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
//# sourceMappingURL=RedCross.js.map