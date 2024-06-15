import p2 from "p2";
import {
  BodyMutable,
  BodyProps,
  Component,
  Point,
  ShapeMutable,
} from "../../types";
import { degreesToRadians } from "../../utils";

export const body: Component<BodyProps, BodyMutable> = ({
  mass,
  angle,
} = {}) => {
  const $body = new p2.Body({
    mass: mass,
    angle: angle ? degreesToRadians(angle) : 0,
  });

  const getBody = () => $body;

  const addShape = (shape: ShapeMutable) => {
    $body.addShape(shape.getShape());
    return shape;
  };
  const removeShape = (shape: ShapeMutable) => {
    $body.removeShape(shape.getShape());
  };

  const setPosition = (position: Point) => {
    $body.position = [-position?.x || 0, -position?.y || 0];
  };
  const getPosition = (): Point => ({
    x: -$body.position[0],
    y: -$body.position[1],
  });

  const getAngle = (): number => $body.angle;
  const setAngle = (angle: number) => ($body.angle = degreesToRadians(angle));

  const addForceX = (force: number) => ($body.force[0] = force);
  const addForceY = (force: number) => ($body.force[1] = force);
  const addForce = (force: Point) => ($body.force = [force.x, force.y]);

  return {
    addShape,
    removeShape,

    setPosition,
    getPosition,

    getAngle,
    setAngle,

    addForceX,
    addForceY,
    addForce,

    getBody,

    $mutable: true,
  };
};
