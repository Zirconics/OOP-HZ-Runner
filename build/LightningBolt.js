import GameElement from './GameElement.js';
export default class LightningBolt extends GameElement {
    constructor(canvas) {
        super(canvas);
        this.image = LightningBolt.loadNewImage('assets/img/objects/titled_yellow_power_icon.png');
        this.points = -10;
    }
}
//# sourceMappingURL=LightningBolt.js.map