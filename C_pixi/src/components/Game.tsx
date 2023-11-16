import { Stage, Container, Sprite, useTick } from '@pixi/react';
import { useRef, useState } from 'react';

const Bunny = () => {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        rotation: 0,
        anchor: 0,
    });
    const iter = useRef(0);

    useTick((delta: number) => {
        const i = (iter.current += 0.05 * delta);

        setData({
            x: Math.sin(i) * 100,
            y: Math.sin(i / 1.5) * 100,
            rotation: Math.sin(i) * Math.PI,
            anchor: Math.sin(i / 2),
        });
    });

    return <Sprite image='treasure.png' {...data} />;
};

export const Game = () => {
    return (
        <Stage width={1920} height={1080} options={{ backgroundAlpha: 0 }}>
            <Container x={150} y={150}>
                <Bunny />
            </Container>
        </Stage>
    );
};
