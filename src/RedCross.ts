import GameElement from './GameElement.js';

export default class RedCross extends GameElement {
  /**
   * Constructs a new instance of RedCross.
   *
   * @param canvas The canvas on which the player should exist.
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.image = RedCross.loadNewImage('assets/img/objects/tilted_cross.png');
    this.points = -5;
  }
}
