import {
  DisplayObjectMutable,
  DisplayObjectProps,
} from "../display-object.types";
import { Container } from "../pixi.types";
import {Hook} from "../hooks.types";

export type ContainerProps = {} & DisplayObjectProps;

export type ContainerMutable = {
  add: (displayObjectMutable: DisplayObjectMutable<any>) => void;
  remove: (displayObjectMutable: DisplayObjectMutable<any>) => void;
} & DisplayObjectMutable<Container>;

export type ContainerReactivity = {
  hooks: {[id: number]: Hook[]}
} & Container;
