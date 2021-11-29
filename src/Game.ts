import BronzeTrophy from './BronzeTrophy.js';
import GameLoop from './GameLoop.js';
import GoldTrophy from './GoldTrophy.js';
import Player from './Player.js';
import RedCross from './RedCross.js';
import SilverTrophy from './SilverTrophy.js';

export default class Game {
  // The canvas
  private canvas: HTMLCanvasElement;

  // The gameloop
  private gameloop: GameLoop;

  // The player on the canvas
  private player: Player;

  // Items on the canvas
  private goldTrophy: GoldTrophy;

  private silverTrophy: SilverTrophy;

  private bronzeTrophy: BronzeTrophy;

  private redCross: RedCross;

  // Score
  private totalScore: number;

  /**
   * Construct a new Game
   *
   * @param canvas The canvas HTML element to render on
   */
  public constructor(canvas: HTMLElement) {
    this.canvas = <HTMLCanvasElement>canvas;

    // Resize the canvas so it looks more like a Runner game
    this.canvas.width = window.innerWidth / 3;
    this.canvas.height = window.innerHeight;

    // TODO create multiple objects over time
    // Create randomItem
    this.createRandomItem();

    // Set the player at the center
    this.player = new Player(this.canvas);

    // Initalise score
    this.totalScore = 0;

    // Start the animation
    console.log('start animation');
    this.gameloop = new GameLoop(this);
    this.gameloop.start();
  }

  /**
   * Handles any user input that has happened since the last call
   */
  public processInput(): void {
    // Move player
    this.player.move();
  }

  /**
   * Advances the game simulation one step. It may run AI and physics (usually
   * in that order)
   *
   * @param elapsed the time in ms that has been elapsed since the previous
   *   call
   * @returns `true` if the game should stop animation
   */
  public update(elapsed: number): boolean {
    // Move objects
    // TODO adjust for multiple objects
    // Check if the player collides with the GoldTrophy item
    if (this.goldTrophy != null) {
      this.goldTrophy.move(elapsed);

      if (this.player.collidesWithGoldTrophy(this.goldTrophy)) {
        this.totalScore += this.goldTrophy.getPoints();
        this.createRandomItem();
      } else if (this.goldTrophy.isCollidingWithBorders()) {
        this.totalScore -= this.goldTrophy.getPoints();
        this.createRandomItem();
      }
    }

    // Check if the player collides with the SilverTrophy item
    if (this.silverTrophy != null) {
      this.silverTrophy.move(elapsed);

      if (this.player.collidesWithSilverTrophy(this.silverTrophy)) {
        this.totalScore += this.silverTrophy.getPoints();
        this.createRandomItem();
      } else if (this.silverTrophy.isCollidingWithBorders()) {
        this.totalScore -= this.silverTrophy.getPoints();
        this.createRandomItem();
      }
    }

    // Check if the player collides with the BronzeTrophy item
    if (this.bronzeTrophy != null) {
      this.bronzeTrophy.move(elapsed);

      if (this.player.collidesWithBronzeTrophy(this.bronzeTrophy)) {
        this.totalScore += this.bronzeTrophy.getPoints();
        this.createRandomItem();
      } else if (this.bronzeTrophy.isCollidingWithBorders()) {
        this.totalScore -= this.bronzeTrophy.getPoints();
        this.createRandomItem();
      }
    }

    // Check if the player collides with the RedCross item
    if (this.redCross != null) {
      this.redCross.move(elapsed);

      if (this.player.collidesWithRedCross(this.redCross)) {
        this.totalScore += this.redCross.getPoints();
        this.createRandomItem();
      } else if (this.redCross.isCollidingWithBorders()) {
        this.createRandomItem();
      }
    }

    return false;
  }

  /**
   * Draw the game so the player can see what happened
   */
  public render(): void {
    // Render the items on the canvas
    // Get the canvas rendering context
    const ctx = this.canvas.getContext('2d');
    // Clear the entire canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.writeTextToCanvas('UP arrow = middle | LEFT arrow = left | RIGHT arrow = right', this.canvas.width / 2, 40, 14);

    // Renders the score.
    this.drawScore();

    // Render the player
    // Center the image in the lane with the x coordinates
    this.player.draw(ctx);

    // Render the objects
    // Center the image in the lane with the x coordinates
    if (this.goldTrophy != null) {
      this.goldTrophy.draw(ctx);
    } else if (this.silverTrophy != null) {
      this.silverTrophy.draw(ctx);
    } else if (this.bronzeTrophy != null) {
      this.bronzeTrophy.draw(ctx);
    } else if (this.redCross != null) {
      this.redCross.draw(ctx);
    }
  }

  private drawScore(): void {
    this.writeTextToCanvas(`Score: ${this.totalScore}`, this.canvas.width / 2, 80, 16);
  }

  private createRandomItem(): void {
    this.goldTrophy = null;
    this.silverTrophy = null;
    this.bronzeTrophy = null;
    this.redCross = null;

    const random = Game.randomInteger(1, 4);

    if (random === 1) {
      this.goldTrophy = new GoldTrophy(this.canvas);
    }

    if (random === 2) {
      this.silverTrophy = new SilverTrophy(this.canvas);
    }

    if (random === 3) {
      this.bronzeTrophy = new BronzeTrophy(this.canvas);
    }

    if (random === 4) {
      this.redCross = new RedCross(this.canvas);
    }
  }

  /**
   * Writes text to the canvas
   *
   * @param text - Text to write
   * @param xCoordinate - Horizontal coordinate in pixels
   * @param yCoordinate - Vertical coordinate in pixels
   * @param fontSize - Font size in pixels
   * @param color - The color of the text
   * @param alignment - Where to align the text
   */
  public writeTextToCanvas(
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    fontSize: number = 20,
    color: string = 'red',
    alignment: CanvasTextAlign = 'center',
  ): void {
    const ctx = this.canvas.getContext('2d');
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;
    ctx.fillText(text, xCoordinate, yCoordinate);
  }

  /**
   * Generates a random integer number between min and max
   *
   * NOTE: this is a 'static' method. This means that this method must be called like
   * `Game.randomInteger()` instead of `this.randomInteger()`.
   *
   * @param min - minimal time
   * @param max - maximal time
   * @returns a random integer number between min and max
   */
  public static randomInteger(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}
