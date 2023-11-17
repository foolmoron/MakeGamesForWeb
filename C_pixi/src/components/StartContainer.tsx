import { Container, Sprite, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

export const StartContainer = ({ onStart }: { onStart: () => void }) => {
    return (
        <Container click={onStart} eventMode='static' >
            <Sprite image='background.png' alpha={0.5} />
            <Text text='CLICK TO START' x={1920/2} y={1080/2} anchor={0.5} style={new TextStyle({
                fontSize: 220
            })} />
        </Container>
    );
};
