import { Stage } from '@pixi/react';
import { GameplayContainer } from './GameplayContainer';

export const Game = () => {
    return (
        <Stage width={1920} height={1080} options={{ backgroundAlpha: 0 }}>
            <GameplayContainer />
        </Stage>
    );
};
