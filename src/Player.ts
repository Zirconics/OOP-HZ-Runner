import KeyListener from './KeyListener.js';
import Trophy from './Trophy';

export default class Player {
  private leftLane: number;

  private middleLane: number;

  private rightLane: number;

  private keyListener: KeyListener;

  private image: HTMLImageElement;

  private positionX: number;

  private canvas: HTMLCanvasElement;

  /**
   * Constructs the player
   *
   * @param canvas drawing board
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    // x positions of the lanes in the canvas
    this.leftLane = this.canvas.width / 4;
    this.middleLane = this.canvas.width / 2;
    this.rightLane = (this.canvas.width / 4) * 3;

    this.keyListener = new KeyListener();

    this.image = Player.loadNewImage(
      './assets/img/players/character_robot_walk0.png',
    );
    this.positionX = this.canvas.width / 2;
  }

  /**
   *
   */
  public move() {
    // Move player
    if (
      this.keyListener.isKeyDown(KeyListener.KEY_LEFT)
      && this.positionX !== this.leftLane
    ) {
      this.positionX = this.leftLane;
    }
    if (
      this.keyListener.isKeyDown(KeyListener.KEY_UP)
      && this.positionX !== this.middleLane
    ) {
      this.positionX = this.middleLane;
    }
    if (
      this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)
      && this.positionX !== this.rightLane
    ) {
      this.positionX = this.rightLane;
    }
  }

  /**
   * @param trophy
   */
  public isCollidingWith(trophy: Trophy): boolean {
    if (
      this.positionX < trophy.getPositionX() + trophy.getImage().width
      && this.positionX + this.image.width > trophy.getPositionX()
      && this.canvas.height - 150
        < trophy.getPositionY() + trophy.getImage().height
      && this.canvas.height - 150 + this.image.height > trophy.getPositionY()
    ) {
      return true;
    }
    return false;
  }

  /**
   * @param ctx
   */
  public draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.positionX - this.image.width / 2,
      this.canvas.height - 150,
    );
  }

  /**
   * Loads an image in such a way that the screen doesn't constantly flicker
   *
   *
   * NOTE: this is a 'static' method. This means that this method must be called like
   * `Game.loadNewImage()` instead of `this.loadNewImage()`.
   *
   * @param source The address or URL of the a media resource that is to be loaded
   * @returns an HTMLImageElement with the source as its src attribute
   */
  private static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }
}
