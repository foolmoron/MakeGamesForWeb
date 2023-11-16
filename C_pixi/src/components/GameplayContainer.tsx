import { Container, Sprite } from '@pixi/react';
import { Player } from './Player';
import { Treasure } from './Treasure';
import { Rect, Vector2 } from '../util/interfaces';
import { useCallback, useEffect, useState } from 'react';

export const GameplayContainer = () => {
    const [secsLeft, setSecsLeft] = useState(11);
    const [gameover, setGameover] = useState(false);
    const [treasures, setTreasures] = useState<Vector2[]>([]);
    const [colliders, setColliders] = useState<Rect[]>([
        // walls
        { x: -200, y: 1110, w: 3000, h: 200 },
        { x: -200, y: -140, w: 3000, h: 200 },
        { x: -170, y: -110, w: 200, h: 2000 },
        { x: 2590, y: -110, w: 200, h: 2000 },
        // pipes and things
        { x: 70, y: 880, w: 100, h: 280 },
        { x: 580, y: 950, w: 100, h: 280 },
        { x: 1470, y: 1010, w: 100, h: 280 },
        { x: 1600, y: 840, w: 220, h: 580 },
    ]);

    // Treasure spawning every X milliseconds, at random location
    useEffect(() => {
        if (gameover) {
            return;
        }
        let id = 0;
        function spawnTreasure() {
            const x = Math.random() * 1920;
            const y = Math.random() * 1080;
            setTreasures(prev => [...prev, { x, y }]);
            id = window.setTimeout(spawnTreasure, 900 + Math.random() * 300);
        }
        spawnTreasure();
        return () => {
            clearTimeout(id);
        }
    }, [gameover])

    // Count down timer every 1 second, game over when 0
    useEffect(() => {
        if (gameover) {
            return;
        }
        let id = 0;
        function countDown() {
            setSecsLeft(prev => prev - 1);
            id = window.setTimeout(countDown, 1000);
        }
        countDown();
        return () => {
            clearTimeout(id);
        }
    }, [gameover]);

    // Game over
    useEffect(() => {
        if (secsLeft <= 0) {
            setGameover(true)
        }
    }, [secsLeft])

    const onTreasureCollected = useCallback((treasureIndex: number) => {
        console.log("DELETE", treasureIndex, treasures[treasureIndex])
        setTreasures(prev => {
            prev.splice(treasureIndex, 1);
            return [...prev];
        })
    }, [treasures]);

    console.log(treasures.length);
    return (
        <Container width={1920} height={1080}>
            <Sprite image='background.png' />
            <Player
                colliders={colliders}
                treasures={treasures}
                onTreasureCollected={onTreasureCollected}
            />
            {treasures.map(t => (
                <Treasure x={t.x} y={t.y} />
            ))}
        </Container>
    );
};
