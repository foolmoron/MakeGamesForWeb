import luxe.States;
import luxe.Vector;
import luxe.Color;
import luxe.options.StateOptions;
import luxe.Input;
import luxe.Sprite;
import luxe.Text;
import luxe.Log.*;
import luxe.IO;

class EndState extends State {

    public var endGrid : Sprite;

    override function onenter<T>(with:T) {
        Main.io.string_save('bestscore', ''+Math.max(Std.parseInt(Main.io.string_load('score')), Std.parseInt(Main.io.string_load('bestscore'))));

        Main.scene.empty();
        Main.scene.add(new Sprite({
            color: new Color().rgb(0xf95929),
            pos: Luxe.screen.mid,
            size: Luxe.screen.size,
        }));

        endGrid = new Sprite({
            texture: Luxe.resources.texture('assets/endgrid.png'),
            pos: Luxe.screen.mid,
        });
        Main.scene.add(endGrid);

        Main.scene.add(new Text({
            text : 'Score: ' + Main.io.string_load('score'),
            color: new Color().rgb(0xffffff),
            align: TextAlign.center,
            align_vertical: TextAlign.center,
            pos : new Vec(Luxe.screen.w/2, Luxe.screen.h/2),
            point_size: 100,
        }));

        Main.scene.add(new Text({
            text : 'Best: ' + Main.io.string_load('bestscore'),
            color: new Color().rgb(0xffffff),
            align: TextAlign.center,
            align_vertical: TextAlign.center,
            pos : new Vec(Luxe.screen.w/2, Luxe.screen.h/2 * 1.4),
            point_size: 60,
        }));

        Main.scene.add(new Text({
            text : 'Press SPACE to restart!',
            color: new Color().rgb(0xffffff),
            align: TextAlign.center,
            align_vertical: TextAlign.center,
            pos : new Vec(Luxe.screen.w/2, Luxe.screen.h/2 * 1.8),
            point_size: 40,
        }));
    }

    override function onkeydown(e:KeyEvent) {
        if (e.keycode == Key.space) {
            Main.state.set('game');            
        }
    }

    override function update(dt:Float) {
        endGrid.rotation_z += 100*dt;
    }
}