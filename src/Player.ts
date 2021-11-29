import KeyListener from './KeyListener.js';
import GoldTrophy from './GoldTrophy.js';
import BronzeTrophy from './BronzeTrophy.js';
import SilverTrophy from './SilverTrophy.js';
import RedCross from './RedCross.js';

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

    this.image = Player.loadNewImage('assets/img/players/character_maleAdventurer_walk0.png');
    this.positionX = this.canvas.width / 2;
  }

  /**
   *
   */
  public move(): void {
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
   * Collision detection of Player and GoldTrophy.
   *
   * @param goldTrophy GoldTrophy item
   * @returns true if the player collides with the GoldTrophy
   */
  public collidesWithGoldTrophy(goldTrophy: GoldTrophy): boolean {
    if (
      this.positionX < goldTrophy.getPositionX() + goldTrophy.getImage().width
      && this.positionX + this.image.width > goldTrophy.getPositionX()
      && this.canvas.height - 150
        < goldTrophy.getPositionY() + goldTrophy.getImage().height
      && this.canvas.height - 150 + this.image.height > goldTrophy.getPositionY()
    ) {
      return true;
    }
    return false;
  }

  /**
   * Collision detection of Player and SilverTrophy.
   *
   * @param silverTrophy SilverTrophy item
   * @returns true if the player collides with the SilverTrophy
   */
  public collidesWithSilverTrophy(silverTrophy: SilverTrophy): boolean {
    if (
      this.positionX < silverTrophy.getPositionX() + silverTrophy.getImage().width
        && this.positionX + this.image.width > silverTrophy.getPositionX()
        && this.canvas.height - 150
          < silverTrophy.getPositionY() + silverTrophy.getImage().height
        && this.canvas.height - 150 + this.image.height > silverTrophy.getPositionY()
    ) {
      return true;
    }
    return false;
  }

  /**
   * Collision detection of Player and BronzeTrophy.
   *
   * @param bronzeTrophy BronzeTrophy item
   * @returns true if the player collides with the BronzeTrophy
   */
  public collidesWithBronzeTrophy(bronzeTrophy: BronzeTrophy): boolean {
    if (
      this.positionX < bronzeTrophy.getPositionX() + bronzeTrophy.getImage().width
          && this.positionX + this.image.width > bronzeTrophy.getPositionX()
          && this.canvas.height - 150
            < bronzeTrophy.getPositionY() + bronzeTrophy.getImage().height
          && this.canvas.height - 150 + this.image.height > bronzeTrophy.getPositionY()
    ) {
      return true;
    }
    return false;
  }

  /**
   * Collision detection of Player and RedCross.
   *
   * @param redCross RedCross item
   * @returns true if the player collides with the RedCross
   */
  public collidesWithRedCross(redCross: RedCross): boolean {
    if (
      this.positionX < redCross.getPositionX() + redCross.getImage().width
            && this.positionX + this.image.width > redCross.getPositionX()
            && this.canvas.height - 150
              < redCross.getPositionY() + redCross.getImage().height
            && this.canvas.height - 150 + this.image.height > redCross.getPositionY()
    ) {
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
