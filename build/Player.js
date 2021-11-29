import KeyListener from './KeyListener.js';
export default class Player {
    leftLane;
    middleLane;
    rightLane;
    keyListener;
    image;
    positionX;
    canvas;
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = (this.canvas.width / 4) * 3;
        this.keyListener = new KeyListener();
        this.image = Player.loadNewImage('assets/img/players/character_maleAdventurer_walk0.png');
        this.positionX = this.canvas.width / 2;
    }
    move() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)
            && this.positionX !== this.leftLane) {
            this.positionX = this.leftLane;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_UP)
            && this.positionX !== this.middleLane) {
            this.positionX = this.middleLane;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)
            && this.positionX !== this.rightLane) {
            this.positionX = this.rightLane;
        }
    }
    collidesWithGoldTrophy(goldTrophy) {
        if (this.positionX < goldTrophy.getPositionX() + goldTrophy.getImage().width
            && this.positionX + this.image.width > goldTrophy.getPositionX()
            && this.canvas.height - 150
                < goldTrophy.getPositionY() + goldTrophy.getImage().height
            && this.canvas.height - 150 + this.image.height > goldTrophy.getPositionY()) {
            return true;
        }
        return false;
    }
    collidesWithSilverTrophy(silverTrophy) {
        if (this.positionX < silverTrophy.getPositionX() + silverTrophy.getImage().width
            && this.positionX + this.image.width > silverTrophy.getPositionX()
            && this.canvas.height - 150
                < silverTrophy.getPositionY() + silverTrophy.getImage().height
            && this.canvas.height - 150 + this.image.height > silverTrophy.getPositionY()) {
            return true;
        }
        return false;
    }
    collidesWithBronzeTrophy(bronzeTrophy) {
        if (this.positionX < bronzeTrophy.getPositionX() + bronzeTrophy.getImage().width
            && this.positionX + this.image.width > bronzeTrophy.getPositionX()
            && this.canvas.height - 150
                < bronzeTrophy.getPositionY() + bronzeTrophy.getImage().height
            && this.canvas.height - 150 + this.image.height > bronzeTrophy.getPositionY()) {
            return true;
        }
        return false;
    }
    collidesWithRedCross(redCross) {
        if (this.positionX < redCross.getPositionX() + redCross.getImage().width
            && this.positionX + this.image.width > redCross.getPositionX()
            && this.canvas.height - 150
                < redCross.getPositionY() + redCross.getImage().height
            && this.canvas.height - 150 + this.image.height > redCross.getPositionY()) {
            return true;
        }
        return false;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.canvas.height - 150);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
//# sourceMappingURL=Player.js.map