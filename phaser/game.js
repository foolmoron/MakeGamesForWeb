window.onload = function() {
    window.game = new Phaser.Game(800, 600, Phaser.AUTO, '', null, false, true, null);

    game.state.add('start', {
        preload: function() {
            this.load.image('bg', 'bg.png');
            this.load.image('character', 'character.png');
            this.load.image('target', 'target.png');
            this.load.image('gameoverbar', 'gameoverbar.png');
            this.load.image('endgrid', 'endgrid.png');
            this.load.image('hat1', 'hat1.png');
            this.load.image('hat2', 'hat2.png');
            this.load.image('hat3', 'hat3.png');
            this.load.image('hat4', 'hat4.png');
        },
        create: function() {
            this.stage.backgroundColor = '#828dbd';

            var titleText = this.add.text(this.world.centerX, this.world.centerY, 'RVA.js Phaser Demo', {fill: '#fff', fontSize: 68});
            titleText.anchor.x = 0.5;
            titleText.anchor.y = 0.5;

            var startText = this.add.text(this.world.centerX, this.world.centerY * 1.5, 'Press SPACE to start!', {fill: '#fff', fontSize: 42});
            startText.anchor.x = 0.5;
            startText.anchor.y = 0.5;
        },
        update: function() {
            if (this.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
                game.state.start('game');
            }
        },
    });

    game.state.add('game', {
        create: function() {
            this.stage.backgroundColor = '#fff';
            this.add.sprite(0, 0, 'bg');

            this.bottomPadding = 40;

            this.character = this.add.sprite(this.world.centerX, this.world.height - this.bottomPadding, 'character');
            this.character.anchor.x = 11/40;
            this.character.anchor.y = 0.9;
            this.character.acceleration = {x: 0, y: 4000};
            this.character.velocity = {x: 0, y: 0};

            switch (Math.floor(Math.random() * 4)) {
                case 0:
                    this.character.addChild(this.make.sprite(-30, -120, 'hat1'));
                    break;
                case 1:
                    this.character.addChild(this.make.sprite(-18, -90, 'hat2'));
                    break;
                case 2:
                    this.character.addChild(this.make.sprite(-29, -92, 'hat3'));
                    break;
                case 3:
                    this.character.addChild(this.make.sprite(-35, -99, 'hat4'));
                    break;
            }

            this.target = this.add.sprite(0, 0, 'target');
            this.randomizeTarget();

            this.gameOverBar = this.add.sprite(this.world.centerX, 0, 'gameoverbar');
            this.gameOverBar.anchor.x = 0.5;

            this.score = 0;
            this.scoreText = this.add.text(this.world.centerX, 0, 'Score: ' + 0, {fill: '#fff', fontSize: 28});
            this.scoreText.anchor.x = 0.5;

            this.roundTime = 10*1000;
            this.gameOverTimer = this.roundTime;
        },
        randomizeTarget: function() {
            this.target.x = Math.random() * this.world.width;
            this.target.y = Math.random() * (this.world.height - this.bottomPadding);
        },
        update: function() {
            if (this.input.keyboard.isDown(Phaser.KeyCode.D)) {
                this.character.velocity.x = 500;
                this.character.scale.x = 1;
            } else if (this.input.keyboard.isDown(Phaser.KeyCode.A)) {
                this.character.velocity.x = -500;
                this.character.scale.x = -1;
            } else {
                this.character.velocity.x = 0;
            }

            var jumpWasPressed = this.input.keyboard.isDown(Phaser.KeyCode.W) && !this.jumpWasDown;
            var jumpWasReleased = this.input.keyboard.isDown(Phaser.KeyCode.W) && !this.jumpWasDown;
            this.jumpWasDown = this.input.keyboard.isDown(Phaser.KeyCode.W);

            if (jumpWasPressed) {
                this.character.velocity.y = -650;
            }

            this.character.velocity.x += this.character.acceleration.x * this.time.elapsed/1000;
            this.character.velocity.y += this.character.acceleration.y * this.time.elapsed/1000;
            this.character.x += this.character.velocity.x * this.time.elapsed/1000;
            this.character.y += this.character.velocity.y * this.time.elapsed/1000;

            this.character.x = Math.min(Math.max(this.character.x, 0), this.world.width);
            this.character.y = Math.min(Math.max(this.character.y, 0), this.world.height - this.bottomPadding);

            if (Phaser.Rectangle.intersects(this.character.getBounds(), this.target.getBounds())) {
                this.score++;
                this.scoreText.text = 'Score: ' + this.score;
                localStorage.setItem('score', this.score);
                this.randomizeTarget();
            }

            this.gameOverTimer -= this.time.elapsed;
            this.gameOverBar.scale.x = this.world.width * (this.gameOverTimer / this.roundTime);
            if (this.gameOverTimer <= 0) {
                game.state.start('end');
            }

            if (this.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
                game.state.start('start');
            }
        },
    });

    game.state.add('end', {
        create: function() {
            this.stage.backgroundColor = '#f95929';

            this.endGrid = this.add.sprite(this.world.centerX, this.world.centerY, 'endgrid');
            this.endGrid.anchor.x = 0.5;
            this.endGrid.anchor.y = 0.5;

            localStorage.setItem('bestscore', Math.max(localStorage.getItem('score'), localStorage.getItem('bestscore')));

            var score = this.add.text(this.world.centerX, this.world.centerY, 'Score: ' + localStorage.getItem('score'), {fill: '#fff', fontSize: 100});
            score.anchor.x = 0.5;
            score.anchor.y = 0.5;

            var best = this.add.text(this.world.centerX, this.world.centerY * 1.4, 'Best: ' + localStorage.getItem('bestscore'), {fill: '#fff', fontSize: 60});
            best.anchor.x = 0.5;
            best.anchor.y = 0.5;

            var restart = this.add.text(this.world.centerX, this.world.centerY * 1.8, 'Press SPACE to restart!', {fill: '#fff', fontSize: 40});
            restart.anchor.x = 0.5;
            restart.anchor.y = 0.5;
        },
        update: function() {
            this.endGrid.rotation += 1 * this.time.elapsed/1000;

            if (this.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
                game.state.start('game');
            }
        },
    });

    game.state.start('start');
};