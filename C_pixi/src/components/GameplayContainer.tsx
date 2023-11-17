import { Container, Sprite } from '@pixi/react';
import { Player } from './Player';
import { Treasure } from './Treasure';
import { Rect, Vector2 } from '../util/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { Arrow } from './Arrow';

interface Props {
    onGetPoint: () => void,
}

export const GameplayContainer = ({ onGetPoint } : Props) => {
    const [treasures, setTreasures] = useState<Vector2[]>([]);
    const [arrows, setArrows] = useState<{rotation: number}[]>([]);
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

    // Handle collecting treasure and granting points
    const onTreasureCollected = useCallback((treasureIndex: number) => {
        setTreasures(prev => {
            prev.splice(treasureIndex, 1);
            return [...prev];
        })
        onGetPoint();
    }, [onGetPoint]);

    // Offset container to player position for camera-panning
    const maxOffsetX = 2560 - 1920;
    const offsetClampedX = Math.max(Math.min(playerPosition.x - 1920 / 2, maxOffsetX), 0)

    // Shoot arrow on click from player towards direction of mouse
    const onClick = useCallback((evt: any) => {
        const x = evt.x + offsetClampedX;
        const y = evt.y;
        const playerToClick = { x: x - playerPosition.x, y: y - playerPosition.y };
        const rotation = Math.atan2(playerToClick.y, playerToClick.x);
        setArrows(prev => [...prev, {
            rotation: rotation,
        }])
    }, [offsetClampedX, playerPosition.x, playerPosition.y]);

    return (
        <Container x={-offsetClampedX} click={onClick} eventMode='static'>
            <Sprite image='background.png' />
            <Player
                position={playerPosition}
                setPosition={setPlayerPosition}
                colliders={colliders}
                treasures={treasures}
                onTreasureCollected={onTreasureCollected}
            />
            {treasures.map((t, i) => (
                <Treasure key={i} x={t.x} y={t.y} />
            ))}
            {arrows.map((a, i) => (
                <Arrow
                    key={i}
                    startPosition={playerPosition}
                    rotation={a.rotation}
                    treasures={treasures}
                    onTreasureCollected={onTreasureCollected}
                />
            ))}
        </Container>
    );
};
