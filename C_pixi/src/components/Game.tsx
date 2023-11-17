import { Stage } from '@pixi/react';
import { GameplayContainer } from './GameplayContainer';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { StartContainer } from './StartContainer';
import { GameOverContainer } from './GameOverContainer';

enum Screen {
    Start,
    Game,
    Over,
}

const ORIGINAL_SECS_LEFT = 10;

export const Game = () => {
    const [screen, setScreen] = useState(Screen.Start);
    const [points, setPoints] = useState(0);
    const [secsLeft, setSecsLeft] = useState(ORIGINAL_SECS_LEFT);

    const onGetPoint = useCallback(() => {
        setPoints(prev => prev + 1);
    }, [])

    // Game over
    useEffect(() => {
        if (secsLeft <= 0) {
            // Save best score
            localStorage.setItem('best', Math.max(points, parseInt(localStorage.getItem('best') ?? '0')).toString());

            // Go to game over screen
            setScreen(Screen.Over)
        }
    }, [points, secsLeft])

    // Count down timer every 1 second, game over when 0
    useEffect(() => {
        if (screen !== Screen.Game) {
            return;
        }
        let id = 0;
        function countDown() {
            setSecsLeft(prev => prev - 1);
            id = window.setTimeout(countDown, 1000);
        }
        id = window.setTimeout(countDown, 1000);
        return () => {
            clearTimeout(id);
        }
    }, [screen]);

    const startGame = useCallback(() => {
        setPoints(0);
        setSecsLeft(ORIGINAL_SECS_LEFT);
        setScreen(Screen.Game);
    }, [])

    const containerToUse = useMemo(() => {
        switch(screen) {
            case Screen.Start:
                return <StartContainer onStart={startGame} />;
            case Screen.Over:
                return <GameOverContainer onRestart={startGame} />;
            case Screen.Game:
                return <GameplayContainer onGetPoint={onGetPoint} />;
        }
    }, [onGetPoint, screen, startGame])

    return (
        <>
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 100,
                textAlign: 'right',
                display: 'flex',
                padding: '0.5rem 1.2rem',
                flexDirection: 'column',
                fontSize: '3rem',
                fontWeight: 'bold',
                background: 'white',
                borderBottomLeftRadius: 48,
            }}>
                <label>Seconds remaining: {secsLeft}</label>
                <label>Treasure collected: {points}</label>
                {screen === Screen.Over && <label>Best collected: {parseInt(localStorage.getItem('best') ?? '0')}</label>}
            </div>
            <Stage width={1920} height={1080} options={{ backgroundAlpha: 0 }}>
                { containerToUse }
            </Stage>
        </>
    );
};
