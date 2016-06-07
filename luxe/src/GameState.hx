import luxe.States;
import luxe.Vector;
import luxe.Color;
import luxe.Input;
import luxe.Sprite;
import luxe.Text;
import luxe.Rectangle;
import luxe.Log.*;
import luxe.IO;

class GameState extends State {

    public static var bottomPadding = 40;

    var character : Sprite;
    var target : Sprite;

    var roundTime = 10.0;
    var gameOverTimer = 10.0;
    var gameOverBar : Sprite;

    var scoreText : Text;
    var score = 0;

    override function onenter<T>(with:T) {
        gameOverTimer = roundTime;

        Main.scene.empty();
        Main.scene.add(new Sprite({
            texture: Luxe.resources.texture('assets/bg.png'),
            pos: Luxe.screen.mid,
            size: Luxe.screen.size,
        }));

        gameOverBar = new Sprite({
            texture: Luxe.resources.texture('assets/gameoverbar.png'),
            origin: new Vec(0.5, 0),
            pos: new Vec(0, 0),
            size: new Vec(Luxe.screen.width, 32),
        });
        Main.scene.add(gameOverBar);

        scoreText = new Text({
            text : 'Score: 0',
            color: new Color().rgb(0xffffff),
            align: TextAlign.center,
            pos : new Vec(Luxe.screen.w/2, 0),
            point_size: 28,
        });
        Main.scene.add(scoreText);

        character = new Sprite({
            texture: Luxe.resources.texture('assets/character.png'),
            origin: new Vec(11, 0.9*80),
            pos: new Vec(Luxe.screen.w/2, Luxe.screen.height - bottomPadding),
        });
        Main.scene.add(character);

        var newtonian = new NewtonianComponent({ name: 'newtonian' });
        newtonian.acceleration = new Vec(0, 2000);
        newtonian.velocity = new Vec(0, 0);
        newtonian.bottomLimit = Luxe.screen.height - bottomPadding;
        character.add(newtonian);

        var wasdControl = new WASDControlComponent({ name: 'wasdControl' });
        wasdControl.speed = 250;
        wasdControl.jumpForce = 250;
        character.add(wasdControl);

        target = new Sprite({
            texture: Luxe.resources.texture('assets/target.png'),
        });
        Main.scene.add(target);

        randomizeTarget();
    }

    function randomizeTarget() {
        target.pos.x = Main.rand.get() * Luxe.screen.width;
        target.pos.y = Main.rand.get() * (Luxe.screen.height - bottomPadding);        
    }

    override function onkeydown(e:KeyEvent) {
        if (e.keycode == Key.space) {
            Main.state.set('start');            
        }
    }

    override function update(dt:Float) {
        if (character.point_inside(target.pos)) {
            score++;
            scoreText.text = 'Score: ' + score;
            Main.io.string_save('score', ''+score);
            randomizeTarget();
        }

        gameOverTimer -= dt;
        gameOverBar.size.x = Luxe.screen.width * (gameOverTimer / roundTime);
        if (gameOverTimer <= 0) {
            Main.state.set('end');
        }
    }
}