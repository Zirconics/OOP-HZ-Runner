export default class RedCross {
  private leftLane: number;

  private middleLane: number;

  private rightLane: number;

  private image: HTMLImageElement;

  private positionX: number;

  private positionY: number;

  private speed: number;

  private canvas: HTMLCanvasElement;

  private points: number;

  /**
   * Construct the trophy
   *
   * @param canvas drawing board
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    // x positions of the lanes in the canvas
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
    this.positionX = this.canvas.width / 2;
    this.positionY = 60;
    this.speed = 2;

    this.points = -5;
  }

  /**
   * Get the x pos from Trophy
   *
   * @returns position on the x-axis
   */
  public getPositionX():number {
    return this.positionX;
  }

  /**
   * Get the y pos from Trophy
   *
   * @returns position on the y-axis
   */
  public getPositionY():number {
    return this.positionY;
  }

  /**
   * Get the x pos from Trophy
   *
   * @returns position on the x-axis
   */
  public getImage():HTMLImageElement {
    return this.image;
  }

  /**
   * @param elapsed Time elapsed
   */
  public move(elapsed: number): void {
    this.positionY += this.speed * elapsed;
  }

  /**
   * Method that returns the value of the RedCross item.
   *
   * @returns Returns point value of item.
   */
  public getPoints(): number {
    return this.points;
  }

  /**
   * Trophy collision.
   *
   * @returns returns wether the trophy collides with the border
   */
  public isCollidingWithBorders(): boolean {
    if (this.positionY + this.image.height > this.canvas.height) {
      return true;
    }
    return false;
  }

  /**
   * @param ctx CanvasRenderingContext2D
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image,
      this.positionX - this.image.width / 2,
      this.positionY,
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
