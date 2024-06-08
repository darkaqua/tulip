import {Container, DisplayObjectMutable, Function} from "../../../../src/types";
import {container as containerComponent, plane} from "../../../../src/components";
import {EventMode} from "../../../../src/enums";
import {Button} from "./button";
import {useEffect, useState} from "../../../../src/render";
import {ball} from "./ball";

type Props = {
  world: any,
};

type Mutable = {} & DisplayObjectMutable<Container>;

export const Trash: Function<Props, Mutable> = ({ world }) => {
  const container = containerComponent({
    label: 'trash',
    eventMode: EventMode.STATIC,
  });

  const [count, setCount] = useState(0);
  console.log('trash', count)

  useEffect(() => console.log('Hello Trash!'), [])

  const addButton = Button({
    label: 'addButton',
    color: 0x487a7e,
    onPress: () => setCount(c => c + 1)
  })
  addButton.setPosition({x: 100, y: 20})
  container.add(addButton)

  const _plane = plane({
    position: {
      x: 0,
      y: 100,
    },
    angle: 0,
  });

  world.add(_plane);

  for(let i = 0; i < count; i++) {
    const _ball = ball({
      label: `ball${i}`,
      color: 0xffff00,
    });

    console.log(_ball)
    _ball.setPosition({ x: i * 10 + 100, y: i * 5 + 20 });

    world.add(_ball)
  }

  return container
}
