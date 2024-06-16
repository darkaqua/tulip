import p2 from "p2";
import {
  CircleShapeProps,
  PlaneShapeProps,
  ShapeProps,
  Shapes,
} from "../types";
import { Shape } from "../enums";

const getBaseProps = <Props extends ShapeProps>({
  position,
  ...props
}: Props) => ({
  ...props,
  position: position
    ? ([position.x, position.y] as [number, number])
    : undefined,
});

export const getShape = ({ type, ...props }: Shapes) => {
  if (type === Shape.CIRCLE) return getCircleShape(props as CircleShapeProps);
  if (type === Shape.PLANE) return getPlaneShape(props as PlaneShapeProps);
};

export const getCircleShape = (props: CircleShapeProps): p2.Circle =>
  new p2.Circle(getBaseProps(props));

export const getPlaneShape = (props: PlaneShapeProps): p2.Plane =>
  new p2.Plane(getBaseProps(props));