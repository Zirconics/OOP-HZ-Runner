import GameElement from './GameElement.js';
export default class GoldTrophy extends GameElement {
    constructor(canvas) {
        super(canvas);
        this.image = GoldTrophy.loadNewImage('assets/img/objects/gold_trophy.png');
        this.points = 10;
    }
}
//# sourceMappingURL=GoldTrophy.js.map