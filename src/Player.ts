import KeyListener from './KeyListener.js';
import GameElement from './GameElement.js';

export default class Player {
  private canvas: HTMLCanvasElement;

  private leftLane: number;

  private middleLane: number;

  private rightLane: number;

  private keyListener: KeyListener;

  private image: HTMLImageElement;

  private positionX: number;

  /**
   * Construct a new Player instance
   *
   * @param canvas the canvas on which the player should exist
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.leftLane = this.canvas.width / 4;
    this.middleLane = this.canvas.width / 2;
    this.rightLane = (this.canvas.width / 4) * 3;

    this.keyListener = new KeyListener();

    this.image = Player.loadNewImage('./assets/img/players/character_robot_walk0.png');
    this.positionX = this.canvas.width / 2;
  }

  /**
   * Moves the player
   */
  public move(): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) && this.positionX !== this.leftLane) {
      this.positionX = this.leftLane;
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_UP) && this.positionX !== this.middleLane) {
      this.positionX = this.middleLane;
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) && this.positionX !== this.rightLane) {
      this.positionX = this.rightLane;
    }
  }

  /**
   * Renders the player
   *
   * @param ctx the rendering context to draw on
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image,
      // Center the image in the lane with the x coordinates
      this.positionX - this.image.width / 2,
      this.canvas.height - 150,
    );
  }

  /**
   * Collision detection of a GameElement and player
   * Use bounding box detection method: https://computersciencewiki.org/index.php/Bounding_boxes
   *
   * @param gameElement the specified GameElement object
   * @returns `true` if the player collides with the GameElement
   */
  public collidesWithGameElement(gameElement: GameElement): boolean {
    if (this.positionX < gameElement.getPositionX() + gameElement.getImageWidth()
            && this.positionX + this.image.width > gameElement.getPositionX()
            && this.canvas.height - 150 < gameElement.getPositionY() + gameElement.getImageHeight()
            && this.canvas.height - 150 + this.image.height > gameElement.getPositionY()
    ) {
      return true;
    }

    return false;
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
