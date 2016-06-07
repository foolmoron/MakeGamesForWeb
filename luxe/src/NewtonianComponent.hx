import luxe.Component;
import luxe.Vector;
import luxe.utils.Maths;

class NewtonianComponent extends Component {

    public var acceleration = new Vec(0, 0);
    public var velocity = new Vec(0, 0);
    public var bottomLimit = Luxe.screen.height;

    override function init() {
        //called when initialising the component
    }

    override function update(dt:Float) {
        this.velocity.x += this.acceleration.x * dt;
        this.velocity.y += this.acceleration.y * dt;
        entity.pos.x += this.velocity.x * dt;
        entity.pos.y += this.velocity.y * dt;

        entity.pos.x = Maths.clamp(entity.pos.x, 0, Luxe.screen.width);
        entity.pos.y = Maths.clamp(entity.pos.y, 0, bottomLimit);
    }
}