import luxe.Component;
import luxe.Vector;
import luxe.Input;
import luxe.utils.Maths;

class WASDControlComponent extends Component {

    public var speed = 500;
    public var jumpForce = 650;
    public var jumpWasDown = false;

    override function init() {
        //called when initialising the component
    }

    override function update(dt:Float) {
        var newtonian = entity.get('newtonian');

        if (Luxe.input.keydown(Key.key_d)) {
            newtonian.velocity.x = speed;
            entity.scale.x = 1;
        } else if (Luxe.input.keydown(Key.key_a)) {
            newtonian.velocity.x = -speed;
            entity.scale.x = -1;
        } else {
            newtonian.velocity.x = 0;
        }

        var jumpWasPressed = Luxe.input.keydown(Key.key_w) && !jumpWasDown;
        var jumpWasReleased = Luxe.input.keydown(Key.key_w) && !jumpWasDown;
        jumpWasDown = Luxe.input.keydown(Key.key_w);

        if (jumpWasPressed) {
            newtonian.velocity.y = -650;
        }
    }
}