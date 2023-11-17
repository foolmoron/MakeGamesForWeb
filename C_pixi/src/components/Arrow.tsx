import { Sprite, useTick } from '@pixi/react';
import { Vector2 } from '../util/interfaces';
import { useState } from 'react';
import { TreasureCollector } from './TreasureCollector';

const ARROW_SPEED = 2000;
const BASE_ROTATION = -Math.PI / 2;
const TREASURE_COLLECT_RADIUS = 110;

interface Props {
    startPosition: Vector2;
    rotation: number;
    treasures: Vector2[];
    onTreasureCollected: (treasureIndex: number) => void;
}

export const Arrow = ({ startPosition, rotation, treasures, onTreasureCollected }: Props) => {
    const [position, setPosition] = useState<Vector2>(startPosition);
    const direction = { x: Math.cos(rotation), y: Math.sin(rotation) };

    useTick((deltaMultiplier) => {
        const dt = (1 / 60) * deltaMultiplier;

        setPosition({
            x: position.x + direction.x * ARROW_SPEED * dt,
            y: position.y + direction.y * ARROW_SPEED * dt
        });
    })

    return <>
        <Sprite image='arrow.png' anchor={0.5} x={position.x} y={position.y} rotation={BASE_ROTATION + rotation} />
        <TreasureCollector position={position} radius={TREASURE_COLLECT_RADIUS} treasures={treasures} onTreasureCollected={onTreasureCollected} />
    </>
};
