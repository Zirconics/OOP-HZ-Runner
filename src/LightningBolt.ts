import GameElement from './GameElement.js';

export default class LightningBolt extends GameElement {
  /**
   * Construct a new instance of this class
   *
   * @param canvas the canvas on which the player should exist
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.image = LightningBolt.loadNewImage('assets/img/objects/titled_yellow_power_icon.png');
    this.points = -10;
  }
}
