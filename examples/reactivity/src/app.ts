import {
  Container,
  container as containerComponent,
  DisplayObjectMutable,
  Function, plane,
  world
} from "../../../src/mod";
import {useEffect, useReducer, useState} from "../../../src/render";
import {Button} from "./components/button";
import {ball} from "./components/ball";

type Mutable = {} & DisplayObjectMutable<Container>;

const testReducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return {
          ...state,
          total: state.total + 1
        }
      case 'remove':
        return {
          ...state,
          total: state.total - 1
        }
    }
}

const initialTestState = {
  data: [],
  more: false,
  total: 0
}

export const app: Function<unknown, Mutable> = () => {
  const container = containerComponent({
    label: 'app',
  });

  const [state, dispatch] = useReducer(testReducer, initialTestState);

  const [count, setCount] = useState(0);

  useEffect(() => console.log('[useEffect] - Hello world!'), [])
  useEffect(() => console.log({count}), [count])
  useEffect(() => console.log(state), [state])


  const removeButton = Button({
    label: 'removeButton',
    color: 0xe4433f,
    onPress: () => setCount(c => c - 1)
  })
  removeButton.setPosition({x: 20, y: 20})
  container.add(removeButton)

  const addButton = Button({
    label: 'addButton',
    color: 0x487a7e,
    onPress: () => setCount(c => c + 1)
  })
  addButton.setPosition({x: 60, y: 20})
  container.add(addButton)


  const _world = world({
    position: { x: 0, y: 0 },
    gravity: { x: 0, y: -9.5 },
    label: "world",
  });

  const _plane = plane({
    position: {
      x: 0,
      y: 100,
    },
    angle: 45,
  });
  _world.add(_plane);

  const _plane2 = plane({
    position: {
      x: 400,
      y: 100,
    },
    angle: -45,
  });
  _world.add(_plane2);

  for(let i = 0; i < count; i++) {
    const _ball = ball({
      label: `ball${i}`,
      color: 0x00ff00,
    });

    _ball.setPosition({ x: i * 10 + 100, y: i * 5 + 10 });

    _world.add(_ball)
  }

  container.add(_world)

  return container;
};
