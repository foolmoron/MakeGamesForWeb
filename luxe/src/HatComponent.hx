import luxe.Component;
import luxe.Vector;
import luxe.Sprite;
import luxe.utils.Maths;

class HatComponent extends Component {

    override function init() {
        switch (Main.rand.int(4)) {
            case 0:
            new Sprite({
                name: 'hat',
                parent: entity,
                texture: Luxe.resources.texture('assets/hat1.png'),
                pos: new Vec(22, -20),
                depth: 1,
            });
            case 1:
            new Sprite({
                name: 'hat',
                parent: entity,
                texture: Luxe.resources.texture('assets/hat2.png'),
                pos: new Vec(37, 10),
                depth: 1,
            });
            case 2:
            new Sprite({
                name: 'hat',
                parent: entity,
                texture: Luxe.resources.texture('assets/hat3.png'),
                pos: new Vec(21, 8),
                depth: 1,
            });
            case 3:
            new Sprite({
                name: 'hat',
                parent: entity,
                texture: Luxe.resources.texture('assets/hat4.png'),
                pos: new Vec(8, 4),
                depth: 1,
            });
        }
    }
}