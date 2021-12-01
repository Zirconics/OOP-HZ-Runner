import GameLoop from './GameLoop.js';
import Level from './Level.js';

/**
 * Main class of this Game.
 */
export default class Game {
  private gameloop: GameLoop;

  private levels: Level[];

  private currentLevel: number;

  /**
   * Construct a new Game
   *
   * @param canvas The canvas HTML element to render on
   */
  public constructor(canvas: HTMLElement) {
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

    // Start the animation
    console.log('start animation');
    this.gameloop = new GameLoop(this);
    this.gameloop.start();
  }

  /**
   * update method
   *
   * @param elapsed elapsed
   * @returns update
   */
  public update(elapsed: number): boolean {
    if (this.levels[this.currentLevel].isCompleted()) {
      // this.level = new Level(this.level.getCanvas(), this.level.getScoreToProgress() * 1.2);
      this.currentLevel += 1;
    }
    return this.levels[this.currentLevel].update(elapsed, this.gameloop.frameCount);
  }

  /**
   * process input
   */
  public processInput(): void {
    this.levels[this.currentLevel].processInput();
  }

  /**
   * Render
   */
  public render(): void {
    this.levels[this.currentLevel].render();
  }
}
