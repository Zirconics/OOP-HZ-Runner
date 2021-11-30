import GameElement from './GameElement.js';
export default class SilverTrophy extends GameElement {
    constructor(canvas) {
        super(canvas);
        this.image = SilverTrophy.loadNewImage('assets/img/objects/silver_trophy.png');
        this.points = 5;
    }
}
//# sourceMappingURL=SilverTrophy.js.map