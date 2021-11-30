import GameElement from './GameElement.js';

export default class SilverTrophy extends GameElement {
  /**
   * Construct a new instance of this class
   *
   * @param canvas the canvas on which the player should exist
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.image = SilverTrophy.loadNewImage('assets/img/objects/silver_trophy.png');
    this.points = 5;
  }
}
