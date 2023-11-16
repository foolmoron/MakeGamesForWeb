import { Container, Sprite, useTick } from '@pixi/react';
import { Vector2 } from '../util/interfaces';
import { useRef } from 'react';

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
    const audioCollect = useRef<HTMLAudioElement>(null);

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
                if (audioCollect.current) {
                    audioCollect.current.currentTime = 0;
                    audioCollect.current.play();
                }

                // Signal collected
                onTreasureCollected(i);
            }
        }
    });

    return (
        <Container>
            {/* <audio ref={audioCollect} src='collect.wav' /> */}
        </Container>
    );
};
