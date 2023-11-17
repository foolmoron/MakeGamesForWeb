import { Container, Sprite } from '@pixi/react';
import { Player } from './Player';
import { Treasure } from './Treasure';
import { Rect, Vector2 } from '../util/interfaces';
import { useCallback, useEffect, useState } from 'react';

interface Props {
    onGetPoint: () => void,
}

export const GameplayContainer = ({ onGetPoint } : Props) => {
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
    const [playerPosition, setPlayerPosition] = useState<Vector2>({
        x: 1920 / 2,
        y: 1080 / 2,
    });

    // Treasure spawning every X milliseconds, at random location
    useEffect(() => {
        let id = 0;
        function spawnTreasure() {
            const x = Math.random() * 2560;
            const y = Math.random() * 1080;
            setTreasures(prev => [...prev, { x, y }]);
            id = window.setTimeout(spawnTreasure, 900 + Math.random() * 300);
        }
        spawnTreasure();
        return () => {
            clearTimeout(id);
        }
    }, [])

    const onTreasureCollected = useCallback((treasureIndex: number) => {
        setTreasures(prev => {
            prev.splice(treasureIndex, 1);
            return [...prev];
        })
        onGetPoint();
    }, [onGetPoint]);

    const maxOffsetX = 2560 - 1920;
    const offsetClampedX = Math.max(Math.min(playerPosition.x - 1920 / 2, maxOffsetX), 0)

    return (
        <Container x={-offsetClampedX}>
            <Sprite image='background.png' />
            <Player
                position={playerPosition}
                setPosition={setPlayerPosition}
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
