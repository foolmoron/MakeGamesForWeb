import luxe.Input;
import luxe.Sprite;
import luxe.Color;
import luxe.States;
import luxe.Scene;
import luxe.Engine;
import luxe.Ev;
import luxe.Log.*;
import luxe.IO;
import luxe.utils.Random;

class Main extends luxe.Game {
    public static var io : IO;

    public static var rand = new Random(0x3389345);

    public static var scene: Scene;
    public static var state: States;

    override function config(config:luxe.GameConfig) {
        config.preload.textures.push({ id:'assets/bg.png' });
        config.preload.textures.push({ id:'assets/character.png' });
        config.preload.textures.push({ id:'assets/target.png' });
        config.preload.textures.push({ id:'assets/gameoverbar.png' });
        config.preload.textures.push({ id:'assets/endgrid.png' });
        config.preload.textures.push({ id:'assets/hat1.png' });
        config.preload.textures.push({ id:'assets/hat2.png' });
        config.preload.textures.push({ id:'assets/hat3.png' });
        config.preload.textures.push({ id:'assets/hat4.png' });
        return config;
    }

    override function ready() {
        untyped {
            console.log('READY');
            document.body.style.backgroundColor = 'white';
            document.getElementById('app').style.margin = '0';
        }

        io = app.io;

        scene = new Scene('game');
        state = new States({ name: 'game' });

        // states
        state.add(new StartState({name: 'start'}));
        state.add(new GameState({name: 'game'}));
        state.add(new EndState({name: 'end'}));

        Luxe.on(Ev.init, function(_) {
            state.set('start');
        });
    }

    override function onkeyup( e:KeyEvent ) {

        if(e.keycode == Key.escape) {
            Luxe.shutdown();
        }

    } //onkeyup

    override function update(dt:Float) {

    } //update


} //Main
