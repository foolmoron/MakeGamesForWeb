import { Container, Sprite, useTick } from '@pixi/react';
import { Vector2 } from '../util/interfaces';
import { useMemo, useRef } from 'react';
import { sound } from '@pixi/sound';

interface Props {
    position: Vector2;
    radius: number;
    treasures: Vector2[];
    onTreasureCollected: (treasureIndex: number) => void;
}

export const TreasureCollector = ({
    position: globalPosition,
    radius,
    treasures,
    onTreasureCollected,
}: Props) => {
    // Load sound
    const playAudioCollect = useMemo(() => {
        sound.add('collect', 'collect.wav');
        return () => sound.play('collect');
    }, [])

    useTick((deltaMultiplier) => {
        const dt = (1 / 60) * deltaMultiplier;

        // Collect treasure, reverse iterate due to element deletion
        for (let i = treasures.length - 1; i >= 0; i--) {
            const treasure = treasures[i];
            const playerToTreasure = {
                x: treasure.x - globalPosition.x,
                y: treasure.y - globalPosition.y,
            };
            // Vector distance calculation to see if we're close enough
            const distance = Math.sqrt(
                playerToTreasure.x * playerToTreasure.x +
                playerToTreasure.y * playerToTreasure.y
            );
            if (distance <= radius) {
                // Play sound
                playAudioCollect();

                // Signal collected
                onTreasureCollected(i);
            }
        }
    });

    return (
        <>
        </>
    );
};
