import { Rect } from './interfaces';

// Box vs Box collision, checks all 4 corners
export function boxBoxCollision(box1: Rect, box2: Rect) {
    return (
        box1.x < box2.x + box2.w &&
        box1.x + box1.w > box2.x &&
        box1.y < box2.y + box2.h &&
        box1.y + box1.h > box2.y
    );
}
