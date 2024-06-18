import {
  Container,
  DisplayObjectMutable,
  world,
  plane,
  empty,
  AsyncComponent,
} from "@tulib/tulip";
import { flyComponent } from "fly.component";

type Mutable = {} & DisplayObjectMutable<Container>;

type Item = {
  id: Number;
  name: String;
  quantity: Number;
};
type Inventory = {
  backpack: Item[];
  left?: Item;
  right?: Item;
};

export const appComponent: AsyncComponent<unknown, Mutable> = async () => {
  const _world = world({
    position: { x: 0, y: 0 },
    label: "world",
    props: {
      physics: {
        enabled: true,
        gravity: { x: 0, y: -0.25 },
      },
    },
  });

  // setTimeout(() => {
  //   _world.setPhysicsEnabled(true);
  //   setTimeout(() => {
  //     _world.setPhysicsEnabled(false);
  //   }, 1000);
  // }, 1000);

  const _plane = plane({
    position: {
      x: 0,
      y: 100,
    },
    angle: 60,
    props: {
      color: 0x333333,
    },
    alpha: 0.25,
  });
  _world.add(_plane);

  const _plane2 = plane({
    position: {
      x: 400,
      y: 200,
    },
    angle: -60,
    props: {
      color: 0x333333,
    },
    alpha: 0.25,
  });
  _world.add(_plane2);
  for (let i = 0; i < 10; i++) {
    const _fly = flyComponent({
      label: `ball`,
      props: {
        color: 0,
        size: 4,
        mass: 10,
      },
      position: {
        x: 250 + i * 5,
        y: 0,
      },
    });
    _world.add(_fly);
  }

  const initialInventory: Inventory = {
    backpack: [{ id: 294, name: "Golden Hoe", quantity: 1 }],
  };

  const inventory = empty<Inventory>({
    initialData: initialInventory,
  });

  const goldenHoe = inventory.getData((data) => data.backpack[0]);
  inventory.setData((data) => ({
    ...data,
    backpack: [],
    right: goldenHoe,
  }));

  // let selectedBall;
  // for (let y = 0; y < 5; y++) {
  //   for (let x = 0; x < 20; x++) {
  //     const isFirst = x === 19 && y === 0;
  //
  //     const _ball = ballComponent({
  //       label: `ball${x * y}`,
  //       color: isFirst ? 0x00ff00 : 0xffffff,
  //       size: 4,
  //     });
  //
  //     _ball.setPosition({ x: x * 5 + 100, y: y * 5 });
  //
  //     if (isFirst) selectedBall = _ball;
  //
  //     _world.add(_ball);
  //   }
  // }
  //
  // let currentKeyList = [];
  // createTicker(selectedBall.getDisplayObject(), () => {
  //   const body = selectedBall.getBody();
  //
  //   if (currentKeyList.includes("d")) {
  //     body.addForceX(-20);
  //   } else if (currentKeyList.includes("a")) {
  //     body.addForceX(20);
  //   } else if (currentKeyList.includes("w")) {
  //     body.addForceY(20);
  //   } else if (currentKeyList.includes("s")) {
  //     body.addForceY(-20);
  //   }
  // });
  //
  // document.addEventListener("keydown", ({ key }) => {
  //   currentKeyList = [...new Set([...currentKeyList, key])];
  // });
  // document.addEventListener("keyup", ({ key }) => {
  //   currentKeyList = currentKeyList.filter((cKey) => cKey != key);
  // });

  return _world.getComponent(appComponent);
};