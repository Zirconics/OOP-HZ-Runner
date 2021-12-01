import GameLoop from './GameLoop.js';
import Level from './Level.js';
export default class Game {
    gameloop;
    levels;
    currentLevel;
    constructor(canvas) {
        this.levels = [
            new Level(canvas, 20),
            new Level(canvas, 50),
            new Level(canvas, 80),
            new Level(canvas, 120),
            new Level(canvas, 170),
            new Level(canvas, 210),
            new Level(canvas, 260),
            new Level(canvas, 340),
            new Level(canvas, 450),
            new Level(canvas, 600),
        ];
        this.currentLevel = 0;
        console.log('start animation');
        this.gameloop = new GameLoop(this);
        this.gameloop.start();
    }
    update(elapsed) {
        if (this.levels[this.currentLevel].isCompleted()) {
            this.currentLevel += 1;
        }
        return this.levels[this.currentLevel].update(elapsed, this.gameloop.frameCount);
    }
    processInput() {
        this.levels[this.currentLevel].processInput();
    }
    render() {
        this.levels[this.currentLevel].render();
    }
}
//# sourceMappingURL=Game.js.map