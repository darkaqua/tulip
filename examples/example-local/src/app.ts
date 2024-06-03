import {
  Container,
  container as containerComponent,
  DisplayObjectMutable,
  AsyncFunction,
  world,
  plane,
  graphics,
  body,
  circleShape,
} from "@darkaqua/tulip";
import { player } from "./player";

type Mutable = {} & DisplayObjectMutable<Container>;

export const app: AsyncFunction<unknown, Mutable> = async () => {
  const container = containerComponent({
    label: "app",
  });

  const _world = world({
    position: { x: 0, y: 0 },
    gravity: { x: 0, y: -0.5 },
    label: "world",
  });
  container.add(_world);

  const _plane = plane({
    position: {
      x: 0,
      y: 50,
    },
  });
  _world.add(_plane);

  const currentPlayer = await player();
  _world.add(currentPlayer);

  const sprite = graphics({
    color: 0x00ff00,
  });
  sprite.setCircle(5);
  sprite.setPosition({ x: 10, y: 0 });
  // const sprite = await spriteComponent({
  //   texture: "player.png",
  // });

  const spriteBody = body({ mass: 1 });
  spriteBody.addShape(circleShape({ radius: 5 }));
  sprite.setBody(spriteBody);

  _world.add(sprite);

  return container;
};