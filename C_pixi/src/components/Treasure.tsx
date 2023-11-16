import { Sprite } from '@pixi/react';

export const Treasure = ({ x, y }: { x : number, y: number }) => {
    return (
        <Sprite image='treasure.png' x={x} y={y} />
    );
};
