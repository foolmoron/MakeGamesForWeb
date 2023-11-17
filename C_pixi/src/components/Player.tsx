import { Container, Graphics, Sprite, useTick } from '@pixi/react';
import { TreasureCollector } from './TreasureCollector';
import { useEffect, useRef, useState } from 'react';
import { Rect, Vector2 } from '../util/interfaces';
import { boxBoxCollision } from '../util/math';

const PLAYER_SPEED = 800;
const GRAVITY = 5000;
const JUMP_FORCE = 1400;
const PLAYER_ANIM_TIME_PER_INDEX = 0.1;
const TREASURE_COLLECT_RADIUS = 110;
const ANIM_PLAYER_WALK = ['player2.png', 'player3.png']

interface Props {
    position: Vector2,
    setPosition: React.Dispatch<React.SetStateAction<Vector2>>,
    colliders: Rect[];
    treasures: Vector2[];
    onTreasureCollected: (treasureIndex: number) => void;
}

export const Player = ({
    position,
    setPosition,
    colliders,
    treasures,
    onTreasureCollected,
}: Props) => {
    const [size, setSize] = useState<Vector2>({ x: 60, y: 190 });
    const direction = useRef<Vector2>({ x: 0, y: 0 });
    const [moving, setMoving] = useState(false);
    const [left, setLeft] = useState(false);
    const [animIndex, setAnimIndex] = useState(0);
    const animTime = useRef(0);
    const velocityY = useRef(0);

    // Directional input handling
    useEffect(() => {
        const onKeydown = (evt: KeyboardEvent) => {
            if (evt.repeat) return;
            if (evt.key === 'w')
                velocityY.current = Math.min(velocityY.current, -JUMP_FORCE);
            if (evt.key === 'a') direction.current.x = -1;
            if (evt.key === 'd') direction.current.x = 1;
        };
        const onKeyup = (evt: KeyboardEvent) => {
            if (evt.key === 'a' && direction.current.x === -1)
                direction.current.x = 0;
            if (evt.key === 'd' && direction.current.x === 1)
                direction.current.x = 0;
        };
        window.addEventListener('keydown', onKeydown);
        window.addEventListener('keyup', onKeyup);
        return () => {
            window.removeEventListener('keydown', onKeydown);
            window.removeEventListener('keyup', onKeyup);
        };
    }, []);

    useTick((deltaMultiplier) => {
        const dt = (1 / 60) * deltaMultiplier;

        // Player gravity
        velocityY.current += GRAVITY * dt;

        // Player movement based on speed and direction
        const newX = position.x + direction.current.x * PLAYER_SPEED * dt;
        const newY = position.y + velocityY.current * dt;

        // Check collision before moving, each axis separately for smooth movement
        let moved = false;
        if (
            direction.current.x !== 0 &&
            !colliders.find((c) =>
                boxBoxCollision(c, {
                    x: newX,
                    y: position.y,
                    w: size.x,
                    h: size.y,
                })
            )
        ) {
            setPosition((prev) => ({ x: newX, y: prev.y }));
            moved = true;
        }
        if (
            !colliders.find((c) =>
                boxBoxCollision(c, {
                    x: position.x,
                    y: newY,
                    w: size.x,
                    h: size.y,
                })
            )
        ) {
            setPosition((prev) => ({ x: prev.x, y: newY }));
        } else {
            velocityY.current = 0;
        }

        // Animation states
        setMoving(moved);
        if (direction.current.x === -1) {
            setLeft(true);
        } else if (direction.current.x === 1) {
            setLeft(false);
        }

        // Animate player
        animTime.current += dt;
        if (animTime.current >= PLAYER_ANIM_TIME_PER_INDEX) {
            animTime.current -= PLAYER_ANIM_TIME_PER_INDEX;
            setAnimIndex(prev => (prev + 1) % ANIM_PLAYER_WALK.length);
        }
    });

    const imgPlayer = moving
        ? ANIM_PLAYER_WALK[animIndex]
        : 'player1.png';

    return (
        <>
            <Sprite image={imgPlayer} anchor={0.5} x={position.x} y={position.y} scale={{ x: left ? -1 : 1, y:1 }} />
            <TreasureCollector
                position={position}
                radius={TREASURE_COLLECT_RADIUS}
                treasures={treasures}
                onTreasureCollected={onTreasureCollected}
            />
        </>
    );
};
