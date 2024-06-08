import {
  Container,
  container as containerComponent,
  DisplayObjectMutable,
  Function,
  world
} from "../../../src/mod";
import {ball} from "./components/ball";
import {Trash} from "./components/trash";

type Mutable = {} & DisplayObjectMutable<Container>;

export const app: Function<unknown, Mutable> = () => {
  const container = containerComponent({
    label: 'app',
  });

  const _world = world({
    position: { x: 0, y: 0 },
    gravity: { x: 0, y: -9.5 },
    label: "world",
  });

  const _ball = ball({
    label: `ball`,
    color: 0x00ffff,
  });
  _ball.setPosition({x: 150, y: 20})
  _world.add(_ball);

  const trash = Trash({world: _world})
  container.add(trash)
  container.add(_world)

  return container;
};
