import GameLoop from './GameLoop.js';
import Player from './Player.js';
import GoldTrophy from './GoldTrophy.js';
import LightningBolt from './LightningBolt.js';
import RedCross from './RedCross.js';
import SilverTrophy from './SilverTrophy.js';
export default class Game {
    canvas;
    gameloop;
    player;
    gameElementArray;
    totalScore;
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth / 3;
        this.canvas.height = window.innerHeight;
        this.gameElementArray = [];
        this.createRandomScoringObject();
        this.player = new Player(this.canvas);
        this.totalScore = 0;
        console.log('start animation');
        this.gameloop = new GameLoop(this);
        this.gameloop.start();
    }
    processInput() {
        this.player.move();
    }
    update(elapsed) {
        if (this.gameloop.frameCount % 100 === 0) {
            this.createRandomScoringObject();
        }
        this.gameElementArray.forEach((gameElement) => {
            gameElement.move(elapsed);
            console.log(gameElement);
            if (this.player.collidesWithGameElement(gameElement)) {
                this.totalScore += gameElement.getPoints();
                this.removeGameElementFromArray(gameElement);
            }
            else if (gameElement.collidesWithCanvasBottom) {
                this.removeGameElementFromArray(gameElement);
            }
        });
        return false;
    }
    render() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas('UP arrow = middle | LEFT arrow = left | RIGHT arrow = right', this.canvas.width / 2, 40, 14);
        this.drawScore();
        this.player.draw(ctx);
        this.gameElementArray.forEach((gameElement) => {
            gameElement.draw(ctx);
        });
    }
    drawScore() {
        this.writeTextToCanvas(`Score: ${this.totalScore}`, this.canvas.width / 2, 80, 16);
    }
    createRandomScoringObject() {
        const random = Game.randomInteger(1, 4);
        if (random === 1) {
            this.gameElementArray.push(new GoldTrophy(this.canvas));
        }
        if (random === 2) {
            this.gameElementArray.push(new SilverTrophy(this.canvas));
        }
        if (random === 3) {
            this.gameElementArray.push(new RedCross(this.canvas));
        }
        if (random === 4) {
            this.gameElementArray.push(new LightningBolt(this.canvas));
        }
    }
    removeGameElementFromArray(item) {
        const index = this.gameElementArray.indexOf(item);
        this.gameElementArray.splice(index, 1);
    }
    writeTextToCanvas(text, xCoordinate, yCoordinate, fontSize = 20, color = 'red', alignment = 'center') {
        const ctx = this.canvas.getContext('2d');
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    static randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=Game.js.map