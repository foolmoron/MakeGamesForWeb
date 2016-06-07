import luxe.States;
import luxe.Vector;
import luxe.Color;
import luxe.options.StateOptions;
import luxe.Input;
import luxe.Sprite;
import luxe.Text;
import luxe.Log.*;
import entities.*;

class StartState extends State {

    override function onenter<T>(with:T) {
        Main.scene.empty();
        Main.scene.add(new Sprite({
            color: new Color().rgb(0x828dbd),
            pos: Luxe.screen.mid,
            size: Luxe.screen.size,
        }));
        Main.scene.add(new Text({
            text : 'RVA.js Luxe Demo',
            color: new Color().rgb(0xffffff),
            align: TextAlign.center,
            align_vertical: TextAlign.center,
            pos : new Vec(Luxe.screen.w/2, Luxe.screen.h/2),
            point_size: 64,
        }));
        Main.scene.add(new Text({
            text : 'Press SPACE to start!',
            color: new Color().rgb(0xffffff),
            align: TextAlign.center,
            align_vertical: TextAlign.center,
            pos : new Vec(Luxe.screen.w/2, Luxe.screen.h/2 * 1.5),
            point_size: 42,
        }));
    }

    override function onkeydown(e:KeyEvent) {
        if (e.keycode == Key.space) {
            Main.state.set('game');            
        }
    }
}